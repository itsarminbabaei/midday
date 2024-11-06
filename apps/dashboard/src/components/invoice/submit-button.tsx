"use client";

import type { InvoiceFormValues } from "@/actions/invoice/schema";
import { updateInvoiceTemplateAction } from "@/actions/invoice/update-invoice-template-action";
import { useInvoiceParams } from "@/hooks/use-invoice-params";
import { Button } from "@travelese/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@travelese/ui/dropdown-menu";
import { Icons } from "@travelese/ui/icons";
import { SubmitButton as BaseSubmitButton } from "@travelese/ui/submit-button";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const options = [
  {
    label: "Create",
    value: "create",
  },
  {
    label: "Create & Send",
    value: "create_and_send",
  },
];

type Props = {
  isSubmitting: boolean;
};

export function SubmitButton({ isSubmitting }: Props) {
  const { type } = useInvoiceParams();
  const { watch, setValue, formState } = useFormContext<InvoiceFormValues>();

  const selectedOption = watch("template.delivery_type");

  const updateInvoiceTemplate = useAction(updateInvoiceTemplateAction);

  const handleOptionChange = (value: string) => {
    const deliveryType = value as "create" | "create_and_send";

    updateInvoiceTemplate.execute({
      delivery_type: deliveryType,
    });

    setValue("template.delivery_type", deliveryType, {
      shouldValidate: true,
    });
  };

  const isValid = formState.isValid;

  return (
    <div className="flex divide-x">
      <BaseSubmitButton isSubmitting={isSubmitting} disabled={!isValid}>
        {type === "update"
          ? "Update"
          : options.find((o) => o.value === selectedOption)?.label}
      </BaseSubmitButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={!isValid || isSubmitting}
            className="size-9 p-0 [&[data-state=open]>svg]:rotate-180"
          >
            <Icons.ChevronDown className="size-4 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={10}>
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={selectedOption === option.value}
              onCheckedChange={() => handleOptionChange(option.value)}
            >
              {option.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
