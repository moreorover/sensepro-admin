import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { newCustomerSchema } from "@/db/schema";
import * as useNewCustomer from "@/features/customers/hooks/use-new-customer";
import { useCreateCustomer } from "@/features/customers/useCustomersApi";
import { z } from "zod";
import { CustomerForm } from "./customers-form";

const formSchema = newCustomerSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

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
