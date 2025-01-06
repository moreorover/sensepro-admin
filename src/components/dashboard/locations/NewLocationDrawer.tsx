"use client";

import LocationForm from "@/components/dashboard/locations/LocationForm";
import { Location } from "@/components/dashboard/locations/location.schema";
import { notifications } from "@mantine/notifications";
import { createLocation } from "@/data-access/location";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { newLocationDrawerAtom } from "@/components/dashboard/locations/location.atom";

export default function NewLocationDrawer() {
  const [value, setOpen] = useAtom(newLocationDrawerAtom);

  async function onSubmit(data: Location) {
    const response = await createLocation(data);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to create Location",
        message: "Please try again.",
      });
    } else {
      setOpen({ isOpen: false, customerId: "" });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Location created.",
      });
    }
    return response;
  }

  function onDelete() {
    console.log("onDelete");
  }

  return (
    <Drawer
      opened={value.isOpen}
      onClose={() => setOpen({ isOpen: false, customerId: "" })}
      position="right"
      title="Create Location"
    >
      <LocationForm
        onSubmitAction={onSubmit}
        onDelete={onDelete}
        location={{ name: "", customerId: value.customerId }}
      />
    </Drawer>
  );
}
