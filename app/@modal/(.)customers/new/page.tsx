"use client";

import CustomerForm from "@/app/customers/CustomerForm";
import { Modal } from "@/components/Modal";
import { newDeviceAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function NewCustomerModal() {
  const newDeviceAtomValue = useAtomValue(newDeviceAtom);
  const customer = { name: "" };

  console.log({ newDeviceAtomValue });

  return (
    <Modal title="New customer" description="Create customer as needed.">
      <div className="p-2 max-w-md">
        <CustomerForm customer={customer} />
      </div>
    </Modal>
  );
}
