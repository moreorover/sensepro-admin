"use client";

import { EditCustomerSheet } from "@/features/customers/components/edit-customer-sheet";
import { NewCustomerSheet } from "@/features/customers/components/new-customer-sheet";
import { EditDeviceSheet } from "@/features/devices/components/edit-device-sheet";
import { NewDeviceSheet } from "@/features/devices/components/new-device-sheet";
import { EditGroupSheet } from "@/features/groups/components/edit-group-sheet";
import { NewGroupSheet } from "@/features/groups/components/new-group-sheet";
import { EditLocationSheet } from "@/features/locations/components/edit-location-sheet";
import { NewLocationSheet } from "@/features/locations/components/new-location-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCustomerSheet />
      <EditCustomerSheet />

      <NewLocationSheet />
      <EditLocationSheet />

      <NewDeviceSheet />
      <EditDeviceSheet />

      <NewGroupSheet />
      <EditGroupSheet />
    </>
  );
};
