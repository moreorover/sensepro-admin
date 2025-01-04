"use client";

import NewCustomerDrawer from "@/components/dashboard/customers/NewCustomerDrawer";
import EditCustomerDrawer from "@/components/dashboard/customers/EditCustomerDrawer";
import NewLocationDrawer from "@/components/dashboard/locations/NewLocationDrawer";
import EditLocationDrawer from "@/components/dashboard/locations/EditLocationDrawer";
import NewDeviceDrawer from "@/components/dashboard/devices/NewDeviceDrawer";
import EditDeviceDrawer from "@/components/dashboard/devices/EditDeviceDrawer";

export default function DrawerProvider() {
  return (
    <>
      <NewCustomerDrawer />
      <EditCustomerDrawer />

      <NewLocationDrawer />
      <EditLocationDrawer />

      <NewDeviceDrawer />
      <EditDeviceDrawer />
    </>
  );
}
