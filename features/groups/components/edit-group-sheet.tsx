import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useConfirm } from "@/hooks/use-confirm";
import { groupForm } from "@/lib/apiSchema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useOpenGroup } from "../hooks/use-open-group";
import { useDeleteGroup, useGetGroup, useUpdateGroup } from "../useGroupsApi";
import { GroupForm } from "./group-form";

type FormValues = z.input<typeof groupForm>;

export const EditGroupSheet = () => {
  const { isOpen, onClose, id } = useOpenGroup();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this group"
  );

  const groupQuery = useGetGroup(id);
  const editMutation = useUpdateGroup(id);
  const deleteMutation = useDeleteGroup(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = groupQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(
      { ...values },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = groupQuery.data
    ? {
        name: groupQuery.data.name,
      }
    : {
        name: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Group</SheetTitle>
            <SheetDescription>Edit an existing group.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <GroupForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={() => onDelete()}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
