"use client";

import NewCustomerDrawer from "@/components/dashboard/customers/NewCustomerDrawer";
import EditCustomerDrawer from "@/components/dashboard/customers/EditCustomerDrawer";
import NewLocationDrawer from "@/components/dashboard/locations/NewLocationDrawer";
import EditLocationDrawer from "@/components/dashboard/locations/EditLocationDrawer";
import NewDeviceDrawer from "@/components/dashboard/devices/NewDeviceDrawer";
import EditDeviceDrawer from "@/components/dashboard/devices/EditDeviceDrawer";
import EditRuleDevicesDrawer from "@/components/dashboard/devices/EditRuleDevicesDrawer";
import NewRuleDrawer from "@/components/dashboard/devices/NewRuleDrawer";
import EditRuleDrawer from "@/components/dashboard/devices/EditRuleDrawer";

export default function DrawerProvider() {
  return (
    <>
      <NewCustomerDrawer />
      <EditCustomerDrawer />

      <NewLocationDrawer />
      <EditLocationDrawer />

      <NewDeviceDrawer />
      <EditDeviceDrawer />

      <NewRuleDrawer />
      <EditRuleDrawer />
      <EditRuleDevicesDrawer />
    </>
  );
}
