import { getConnectionsStatus } from "@/utils/connection-status";
import { getBankConnectionsByTeamId } from "@travelese/supabase/cached-queries";
import { Button } from "@travelese/ui/button";
import { cn } from "@travelese/ui/cn";
import { Icons } from "@travelese/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@travelese/ui/tooltip";
import Link from "next/link";

export async function ConnectionStatus() {
  const bankConnections = await getBankConnectionsByTeamId();

  if (!bankConnections?.data?.length) {
    return null;
  }

  const connectionIssue = bankConnections?.data?.some(
    (bank) => bank.status === "disconnected",
  );

  if (connectionIssue) {
    return (
      <TooltipProvider delayDuration={70}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/settings/accounts" prefetch>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-8 h-8 items-center hidden md:flex"
              >
                <Icons.Error size={16} className="text-[#FF3638]" />
              </Button>
            </Link>
          </TooltipTrigger>

          <TooltipContent
            className="px-3 py-1.5 text-xs max-w-[230px]"
            sideOffset={10}
          >
            There is a connection issue with one of your banks.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const { warning, error, show } = getConnectionsStatus(bankConnections.data);

  if (!show) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={70}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/settings/accounts" prefetch>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 items-center hidden md:flex"
            >
              <Icons.Error
                size={16}
                className={cn(
                  error && "text-[#FF3638]",
                  warning && "text-[#FFD02B]",
                )}
              />
            </Button>
          </Link>
        </TooltipTrigger>

        <TooltipContent
          className="px-3 py-1.5 text-xs max-w-[230px]"
          sideOffset={10}
        >
          The connection is expiring soon, update your connection.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
