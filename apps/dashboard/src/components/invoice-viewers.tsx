"use client";

import { formatRelativeTime } from "@/utils/format";
import { createClient } from "@travelese/supabase/client";
import { AnimatedSizeContainer } from "@travelese/ui/animated-size-container";
import { Avatar, AvatarFallback, AvatarImage } from "@travelese/ui/avatar";
import { Separator } from "@travelese/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@travelese/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Customer } from "./invoice-toolbar";

interface User {
  id: string;
  avatar_url: string | null;
  full_name: string | null;
}

type Props = {
  customer: Customer;
  viewedAt: string;
};

export function InvoiceViewers({ customer, viewedAt }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCurrentUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser({
          id: user.id,
          avatar_url: user.user_metadata.avatar_url,
          full_name: user.user_metadata.full_name,
        });
      }
    }

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <AnimatedSizeContainer width>
      <motion.div
        className="flex items-center"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "auto", opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.5 }}
      >
        <Separator orientation="vertical" className="mr-3 ml-2 h-4" />

        {currentUser && (
          <div className="mr-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar className="size-5 object-contain border border-border">
                    <AvatarImage src={currentUser.avatar_url || undefined} />
                    <AvatarFallback className="text-[9px] font-medium">
                      {currentUser.full_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={20}
                  className="text-[10px] px-2 py-1 rounded-sm font-medium"
                >
                  <p>just now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="size-5 object-contain border border-border">
                {customer?.website && (
                  <AvatarImage
                    src={`https://img.logo.dev/${customer.website}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=60`}
                    alt={`${customer.name} logo`}
                  />
                )}
                <AvatarFallback className="text-[9px] font-medium">
                  {customer.name?.[0]}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>

            <TooltipContent
              sideOffset={20}
              className="text-[10px] px-2 py-1 rounded-sm font-medium"
            >
              {viewedAt ? formatRelativeTime(new Date(viewedAt)) : "Not viewed"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </AnimatedSizeContainer>
  );
}
