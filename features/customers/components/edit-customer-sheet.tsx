import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { newCustomerSchema } from "@/db/schema";
import { useOpenCustomer } from "@/features/customers/hooks/use-open-customer";
import {
  useDeleteCustomer,
  useGetCustomer,
  useUpdateCustomer,
} from "@/features/customers/useCustomersApi";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { CustomerForm } from "./customers-form";

const formSchema = newCustomerSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCustomerSheet = () => {
  const { isOpen, onClose, id } = useOpenCustomer();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction"
  );

  const customerQuery = useGetCustomer(id);
  const editMutation = useUpdateCustomer(id);
  const deleteMutation = useDeleteCustomer(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = customerQuery.isLoading;
  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
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

  const defaultValues = customerQuery.data
    ? {
        name: customerQuery.data.name,
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
            <SheetTitle>Edit Customer</SheetTitle>
            <SheetDescription>Edit an existing customer.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <CustomerForm
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
