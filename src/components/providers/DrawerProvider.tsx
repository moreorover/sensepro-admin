"use client";

import NewCustomerDrawer from "@/components/dashboard/customers/NewCustomerDrawer";
import EditCustomerDrawer from "@/components/dashboard/customers/EditCustomerDrawer";
import NewLocationDrawer from "@/components/dashboard/locations/NewLocationDrawer";
import EditLocationDrawer from "@/components/dashboard/locations/EditLocationDrawer";

export default function DrawerProvider() {
  return (
    <>
      <NewCustomerDrawer />
      <EditCustomerDrawer />

      <NewLocationDrawer />
      <EditLocationDrawer />
    </>
  );
}
