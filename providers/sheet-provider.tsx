"use client";

import { EditCustomerSheet } from "@/features/customers/components/edit-customer-sheet";
import { NewCustomerSheet } from "@/features/customers/components/new-customer-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCustomerSheet />
      <EditCustomerSheet />
    </>
  );
};
