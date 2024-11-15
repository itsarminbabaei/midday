import { logger, task } from "@trigger.dev/sdk/v3";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { supabase } from "../client";
import { Jobs } from "../constants";
import { processBatch } from "../utils/process";

const BATCH_LIMIT = 500;

type GetAccountBalanceParams = {
  currency: string;
  balance: number;
  baseCurrency: string;
  rate: number | null;
};

function getAccountBalance({
  currency,
  balance,
  baseCurrency,
  rate,
}: GetAccountBalanceParams) {
  if (currency === baseCurrency) {
    return balance;
  }

  return +(balance * (rate ?? 1)).toFixed(2);
}

type GetTransactionAmountParams = {
  amount: number;
  currency: string;
  baseCurrency: string;
  rate: number | null;
};

function getTransactionAmount({
  amount,
  currency,
  baseCurrency,
  rate,
}: GetTransactionAmountParams) {
  if (currency === baseCurrency) {
    return amount;
  }

  return +(amount * (rate ?? 1)).toFixed(2);
}

type UpdateCurrencyPayload = z.infer<typeof schema>;

const schema = z.object({
  teamId: z.string(),
  baseCurrency: z.string(),
});

export const updateCurrency = task({
  id: Jobs.UPDATE_CURRENCY,
  run: async (payload: UpdateCurrencyPayload) => {
    const { teamId, baseCurrency } = payload;

    // Get all enabled accounts
    const { data: accounts } = await supabase
      .from("bank_accounts")
      .select("id, currency, balance")
      .eq("team_id", teamId)
      .eq("enabled", true);

    const promises = accounts?.map(async (account) => {
      const { data: exchangeRate } = await supabase
        .from("exchange_rates")
        .select("rate")
        .eq("base", account.currency)
        .eq("target", baseCurrency)
        .single();

      // Update account base balance and base currency
      // based on the new currency exchange rate
      await supabase
        .from("bank_accounts")
        .update({
          base_balance: getAccountBalance({
            currency: account.currency,
            balance: account.balance,
            baseCurrency,
            rate: exchangeRate?.rate,
          }),
          base_currency: baseCurrency,
        })
        .eq("id", account.id);

      const { data: transactions } = await supabase.rpc(
        "get_all_transactions_by_account",
        {
          account_id: account.id,
        },
      );

      const formattedTransactions = transactions?.map(
        // Exclude fts_vector from the transaction object because it's a generated column
        ({ fts_vector, ...transaction }) => ({
          ...transaction,
          base_amount: getTransactionAmount({
            amount: transaction.amount,
            currency: transaction.currency,
            baseCurrency,
            rate: exchangeRate?.rate,
          }),
          base_currency: baseCurrency,
        }),
      );

      await processBatch(
        formattedTransactions ?? [],
        BATCH_LIMIT,
        async (batch) => {
          await supabase.from("transactions").upsert(batch, {
            onConflict: "internal_id",
            ignoreDuplicates: false,
          });
        },
      );
    });

    if (promises) {
      await Promise.all(promises);
    }

    revalidateTag(`spending_${teamId}`);
    revalidateTag(`metrics_${teamId}`);
    revalidateTag(`insights_${teamId}`);
    revalidateTag(`runway_${teamId}`);
    revalidateTag(`burn_rate_${teamId}`);
    revalidateTag(`expenses_${teamId}`);

    return;
  },
});
