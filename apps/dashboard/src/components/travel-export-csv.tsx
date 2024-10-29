import { formatAmount, secondsToHoursAndMinutes } from "@/utils/format";
import { UTCDate } from "@date-fns/utc";
import { createClient } from "@travelese/supabase/client";
import { Button } from "@travelese/ui/button";
import { Calendar } from "@travelese/ui/calendar";
import {
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@travelese/ui/dropdown-menu";
import { Label } from "@travelese/ui/label";
import { Switch } from "@travelese/ui/switch";
import { endOfMonth, format, startOfMonth } from "date-fns";
import Papa from "papaparse";
import React, { useState } from "react";
import type { DateRange } from "react-day-picker";

type Props = {
  name: string;
  bookingId: string;
  currency: string;
  billable: boolean;
  teamId: string;
  userId: string;
  rate: number;
};

export function TravelExportCSV({
  name,
  teamId,
  bookingId,
  currency,
  userId,
  billable,
  rate,
}: Props) {
  const [includeTeam, setIncludeTeam] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: endOfMonth(new Date()),
  });

  const supabase = createClient();

  async function downloadCSV() {
    const query = supabase
      .from("travel_entries")
      .select(
        "date, description, duration, assigned:assigned_id(id, full_name), booking:booking_id(id, name)",
      )
      .eq("team_id", teamId)
      .gte("date", new UTCDate(date?.from)?.toISOString())
      .lte("date", new UTCDate(date?.to)?.toISOString())
      .eq("booking_id", bookingId)
      .order("date");

    if (!includeTeam) {
      query.eq("assigned_id", userId);
    }

    const { data } = await query;

    const formattedData = data?.map((item) => {
      const formattedItem: Record<string, string | null> = {
        Date: format(item.date, "P"),
        Description: item.description,
        Time: secondsToHoursAndMinutes(item.duration ?? 0),
      };

      if (includeTeam) {
        formattedItem.Assigned = item.assigned?.full_name ?? null;
      }

      const { Date: date, Assigned, Description, Time } = formattedItem;

      return includeTeam
        ? { Date: date, Assigned, Description, Time }
        : { Date: date, Description, Time };
    });

    const totalTimeInSeconds =
      data?.reduce((sum, item) => sum + (item?.duration ?? 0), 0) ?? 0;

    const totalBillable = (totalTimeInSeconds / 3600) * rate;

    const dataWithFooter = [
      ...(formattedData ?? []),
      {
        Date: "Total Time",
        Assigned: null,
        Description: null,
        Time: secondsToHoursAndMinutes(totalTimeInSeconds),
      },
      ...(billable
        ? [
            {
              Date: "Total Amount",
              Assigned: null,
              Description: null,
              Time: formatAmount({
                amount: totalBillable,
                currency,
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }),
            },
          ]
        : []),
    ];

    const csv = Papa.unparse(dataWithFooter);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;

    link.setAttribute("download", `${name}.csv`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  }

  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              disabled={(date) => date > new Date()}
            />

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Include team</Label>
                <Switch
                  checked={includeTeam}
                  onCheckedChange={setIncludeTeam}
                />
              </div>
              <Button onClick={downloadCSV} className="w-full" disabled={!date}>
                Export
              </Button>
            </div>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
}
