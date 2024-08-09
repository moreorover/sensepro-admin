import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { groupForm } from "@/lib/apiSchema";
import { z } from "zod";
import { useNewGroup } from "../hooks/use-new-group";
import { useCreateGroup } from "../useDevicesApi";
import { GroupForm } from "./group-form";

type FormValues = z.input<typeof groupForm>;

export const NewGroupSheet = () => {
  const { isOpen, onClose, locationId } = useNewGroup();
  const mutation = useCreateGroup();

  const onSubmit = (values: FormValues) => {
    if (locationId) {
      mutation.mutate(
        {
          ...values,
          locationId,
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      console.error("locationId is not set!");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Group</SheetTitle>
          <SheetDescription>
            Create a new customer location group.
          </SheetDescription>
        </SheetHeader>
        <GroupForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
