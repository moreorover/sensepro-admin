import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as useNewCustomer from "@/features/customers/hooks/use-new-customer";
import { useCreateCustomer } from "@/features/customers/useCustomersApi";
import { updateCustomer } from "@/lib/apiSchema";
import { z } from "zod";
import { CustomerForm } from "./customers-form";

type FormValues = z.input<typeof updateCustomer>;

export const NewCustomerSheet = () => {
  const { isOpen, onClose } = useNewCustomer.useNewCustomers();
  const mutation = useCreateCustomer();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Customer</SheetTitle>
          <SheetDescription>Create a new customer.</SheetDescription>
        </SheetHeader>
        <CustomerForm
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
