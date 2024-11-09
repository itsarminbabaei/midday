import { createClient } from "@travelese/supabase/job";
import { logger, schemaTask } from "@trigger.dev/sdk/v3";
import { subDays } from "date-fns";
import { z } from "zod";
import { invoiceNotification } from "./notification";

export const checkInvoiceStatus = schemaTask({
  id: "check-invoice-status",
  schema: z.object({
    invoiceId: z.string().uuid(),
  }),
  run: async ({ invoiceId }) => {
    const supabase = createClient();

    const { data: invoice } = await supabase
      .from("invoices")
      .select(
        "id, status, due_date, currency, amount, team_id, file_path, invoice_number",
      )
      .eq("id", invoiceId)
      .single();

    if (!invoice) return;

    const isOverdue =
      invoice.due_date && new Date(invoice.due_date) < new Date();

    // Check if the invoice is overdue
    if (invoice.status === "unpaid" && isOverdue) {
      const { data: updatedInvoice } = await supabase
        .from("invoices")
        .update({ status: "overdue" })
        .eq("id", invoiceId)
        .select()
        .single();

      if (updatedInvoice) {
        logger.info("Invoice status changed to overdue", {
          invoiceId,
        });

        await invoiceNotification.trigger({
          invoiceId,
          status: updatedInvoice?.status as "overdue" | "paid",
        });
      }
    }

    if (!invoice.amount || !invoice.currency || !invoice.team_id) return;

    // Check if invoice is paid
    const { data: transactions } = await supabase
      .from("transactions")
      .select("id")
      .eq("team_id", invoice.team_id)
      .eq("amount", invoice.amount)
      .eq("currency", invoice.currency)
      .gte("date", subDays(new Date(), 5).toISOString())
      .eq("is_fulfilled", false);

    if (transactions?.length === 1) {
      // Update invoice status
      const { data: updatedInvoice } = await supabase
        .from("invoices")
        .update({ status: "paid" })
        .eq("id", invoiceId)
        .select()
        .single();

      const transactionId = transactions.at(0)?.id;
      const filename = `${invoice.invoice_number}.pdf`;

      // Insert transaction attachment
      await supabase
        .from("transaction_attachments")
        .insert({
          type: "application/pdf",
          path: invoice.file_path,
          transaction_id: transactionId,
          team_id: invoice.team_id,
          name: filename,
          size: 0, // TODO: Get size
        })
        .select()
        .single();

      if (updatedInvoice) {
        logger.info("Invoice status changed to paid", {
          invoiceId,
        });

        await invoiceNotification.trigger({
          invoiceId,
          status: updatedInvoice?.status as "overdue" | "paid",
        });
      }
    }
  },
});
