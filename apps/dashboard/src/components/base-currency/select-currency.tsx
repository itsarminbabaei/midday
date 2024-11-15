"use client";

import { updateCurrencyAction } from "@/actions/transactions/update-currency-action";
import { SelectCurrency as SelectCurrencyBase } from "@/components/select-currency";
import { uniqueCurrencies } from "@travelese/location/src/currencies";
import { Button } from "@travelese/ui/button";
import { useToast } from "@travelese/ui/use-toast";
import { useRealtimeRun } from "@trigger.dev/react-hooks";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";

export function SelectCurrency({ defaultValue }: { defaultValue: string }) {
  const { toast } = useToast();
  const [eventId, setEventId] = useState<string | undefined>();
  const [isSyncing, setSyncing] = useState(false);
  const { run } = useRealtimeRun(eventId ?? "");

  const error = run?.status === "FAILED" || run?.status === "TIMED_OUT";

  const updateCurrency = useAction(updateCurrencyAction, {
    onExecute: () => setSyncing(true),
    onSuccess: ({ data }) => {
      if (data?.id) {
        setEventId(data.id);
      }
    },
    onError: () => {
      setEventId(undefined);
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong pleaase try again.",
      });
    },
  });

  const handleChange = async (baseCurrency: string) => {
    if (baseCurrency !== defaultValue) {
      toast({
        title: "Update base currency",
        description:
          "This will update the base currency for all transactions and account balances.",
        duration: 7000,
        footer: (
          <Button onClick={() => updateCurrency.execute({ baseCurrency })}>
            Update
          </Button>
        ),
      });

      return;
    }
  };

  useEffect(() => {
    if (eventId) {
    }
  }, [eventId]);

  useEffect(() => {
    if (run?.status === "COMPLETED") {
      setSyncing(false);
      setEventId(undefined);
      toast({
        duration: 3500,
        variant: "success",
        title: "Transactions and account balances updated.",
      });
    }
  }, [run?.status]);

  useEffect(() => {
    if (isSyncing) {
      toast({
        title: "Updating...",
        description: "We're updating your base currency, please wait.",
        duration: Number.POSITIVE_INFINITY,
        variant: "spinner",
      });
    }
  }, [isSyncing]);

  useEffect(() => {
    if (error) {
      setSyncing(false);
      setEventId(undefined);

      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong pleaase try again.",
      });
    }
  }, [error]);

  return (
    <div className="w-[200px]">
      <SelectCurrencyBase
        onChange={handleChange}
        currencies={uniqueCurrencies}
        value={defaultValue}
      />
    </div>
  );
}
