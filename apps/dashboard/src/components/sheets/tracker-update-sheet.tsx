"use client";

import { deleteProjectAction } from "@/actions/project/delete-project-action";
import { updateProjectAction } from "@/actions/project/update-project-action";
import { updateProjectSchema } from "@/actions/schema";
import { TrackerProjectForm } from "@/components/forms/tracker-project-form";
import { useTrackerParams } from "@/hooks/use-tracker-params";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@travelese/supabase/client";
import { getTrackerProjectQuery } from "@travelese/supabase/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@travelese/ui/alert-dialog";
import { Drawer, DrawerContent, DrawerHeader } from "@travelese/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@travelese/ui/dropdown-menu";
import { useMediaQuery } from "@travelese/ui/hooks";
import { Icons } from "@travelese/ui/icons";
import { ScrollArea } from "@travelese/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader } from "@travelese/ui/sheet";
import { useToast } from "@travelese/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type Props = {
  userId: string;
  teamId: string;
};

export function TrackerUpdateSheet({ teamId }: Props) {
  const { toast } = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { setParams, update, projectId } = useTrackerParams();
  const supabase = createClient();
  const id = projectId ?? "";

  const isOpen = update !== null && Boolean(projectId);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      id: undefined,
      name: undefined,
      description: undefined,
      rate: undefined,
      status: undefined,
      billable: undefined,
      estimate: 0,
      currency: undefined,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTrackerProjectQuery(supabase, {
        teamId,
        projectId: id,
      });

      if (data) {
        form.reset({
          id: data.id,
          name: data.name,
          description: data.description ?? undefined,
          rate: data.rate ?? undefined,
          status: data.status ?? undefined,
          billable: data.billable ?? undefined,
          estimate: data.estimate ?? undefined,
          currency: data.currency ?? undefined,
        });
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const deleteAction = useAction(deleteProjectAction, {
    onSuccess: () => {
      setParams({ update: null, projectId: null });
      form.reset();
    },
    onError: () => {
      toast({
        duration: 2500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  const updateAction = useAction(updateProjectAction, {
    onSuccess: () => {
      setParams({ update: null, projectId: null });
      form.reset();
    },
    onError: () => {
      toast({
        duration: 3500,
        variant: "error",
        title: "Something went wrong please try again.",
      });
    },
  });

  if (isDesktop) {
    return (
      <AlertDialog>
        <Sheet
          open={isOpen}
          onOpenChange={() => setParams({ update: null, projectId: null })}
        >
          <SheetContent>
            <SheetHeader className="mb-8 flex justify-between items-center flex-row">
              <h2 className="text-xl">Edit Project</h2>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Icons.MoreVertical className="w-5 h-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-42"
                  sideOffset={10}
                  align="end"
                >
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </SheetHeader>

            <ScrollArea className="h-full p-0 pb-280" hideScrollbar>
              <TrackerProjectForm
                form={form}
                isSaving={updateAction.status === "executing"}
                onSubmit={updateAction.execute}
              />
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              project.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteAction.execute({ id })}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          setParams({ update: null, projectId: null });
        }
      }}
    >
      <DrawerContent className="p-6">
        <DrawerHeader className="mb-8 flex justify-between items-center flex-row">
          <h2 className="text-xl">Edit Project</h2>
        </DrawerHeader>

        <TrackerProjectForm
          form={form}
          isSaving={updateAction.status === "executing"}
          onSubmit={updateAction.execute}
        />
      </DrawerContent>
    </Drawer>
  );
}
