"use client";

import DeviceForm from "@/components/dashboard/devices/DeviceForm";
import { Device } from "@/components/dashboard/devices/device.schema";
import { notifications } from "@mantine/notifications";
import { createDevice } from "@/data-access/device";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { newDeviceDrawerAtom } from "@/components/dashboard/devices/device.atom";
import { faker } from "@faker-js/faker";

export default function NewDeviceDrawer() {
  const [value, setOpen] = useAtom(newDeviceDrawerAtom);

  async function onSubmit(data: Device) {
    const response = await createDevice(data);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to create Device",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        locationId: "",
        deviceTypeId: "",
        controllerId: "",
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Device created.",
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
        setOpen({
          isOpen: false,
          locationId: "",
          deviceTypeId: "",
          controllerId: "",
        })
      }
      position="right"
      title="Create Device"
    >
      <DeviceForm
        onSubmitAction={onSubmit}
        onDelete={onDelete}
        device={{
          name: "",
          mac:
            process.env.NODE_ENV === "development" ? faker.internet.mac() : "",
          ip: null,
          tailscaleIp: null,
          serialNumber: "",
          pin: null,
          locationId: value.locationId,
          deviceTypeId: value.deviceTypeId,
          controllerId: value.controllerId,
        }}
      />
    </Drawer>
  );
}
