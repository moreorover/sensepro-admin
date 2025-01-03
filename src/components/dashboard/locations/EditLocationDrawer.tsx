"use client";

import LocationForm from "@/components/dashboard/locations/LocationForm";
import { Location } from "@/components/dashboard/locations/location.schema";
import { notifications } from "@mantine/notifications";
import { updateLocation } from "@/data-access/location";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { editLocationDrawerAtom } from "@/components/dashboard/locations/location.atom";

export default function EditLocationDrawer() {
  const [value, setOpen] = useAtom(editLocationDrawerAtom);

  async function onSubmit(data: Location) {
    const response = await updateLocation({ ...data, id: value.location.id });

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to update Location",
        message: "Please try again.",
      });
    } else {
      setOpen({ isOpen: false, location: { name: "", customerId: "" } });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Location updated.",
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
      onClose={() =>
        setOpen({ isOpen: false, location: { name: "", customerId: "" } })
      }
      position="right"
      title="Update Location"
    >
      <LocationForm
        onSubmitAction={onSubmit}
        onDelete={onDelete}
        location={{ ...value.location }}
      />
    </Drawer>
  );
}
