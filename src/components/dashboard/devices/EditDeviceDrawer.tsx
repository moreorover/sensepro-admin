"use client";

import DeviceForm from "@/components/dashboard/devices/DeviceForm";
import { Device } from "@/components/dashboard/devices/device.schema";
import { notifications } from "@mantine/notifications";
import { updateDevice } from "@/data-access/device";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { editDeviceDrawerAtom } from "@/components/dashboard/devices/device.atom";

export default function EditDeviceDrawer() {
  const [value, setOpen] = useAtom(editDeviceDrawerAtom);

  async function onSubmit(data: Device) {
    const response = await updateDevice(data);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to update Device",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        device: {
          name: "",
          mac: "",
          ip: null,
          tailscaleIp: null,
          serialNumber: "",
          locationId: null,
          deviceTypeId: "",
          controllerId: null,
        },
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Device updated.",
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
          device: {
            name: "",
            mac: "",
            ip: null,
            tailscaleIp: null,
            serialNumber: "",
            locationId: null,
            deviceTypeId: "",
            controllerId: null,
          },
        })
      }
      position="right"
      title="Edit Device"
    >
      <DeviceForm
        onSubmitAction={onSubmit}
        onDelete={onDelete}
        device={value.device}
      />
    </Drawer>
  );
}
