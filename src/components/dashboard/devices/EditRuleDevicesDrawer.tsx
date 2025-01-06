"use client";

import { RuleDevices } from "@/components/dashboard/devices/device.schema";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { editRuleDevicesDrawerAtom } from "@/components/dashboard/devices/rule.atom";
import RuleDevicesForm from "@/components/dashboard/devices/RuleDevicesForm";
import { updateRuleDevices } from "@/data-access/rule";
import { notifications } from "@mantine/notifications";

export default function EditRuleDevicesDrawer() {
  const [value, setOpen] = useAtom(editRuleDevicesDrawerAtom);

  async function onSubmit(data: RuleDevices) {
    const response = await updateRuleDevices(
      value.rule.id!,
      data.selectedDevices,
    );

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to update Device",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        rule: { name: "", type: "AND", locationId: "", controllerId: "" },
        selectedDevices: [],
        deviceOptions: [],
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Device updated.",
      });
    }
    return response;
  }

  return (
    <Drawer
      opened={value.isOpen}
      onClose={() =>
        setOpen({
          isOpen: false,
          rule: { name: "", type: "AND", locationId: "", controllerId: "" },
          selectedDevices: [],
          deviceOptions: [],
        })
      }
      position="right"
      title="Edit Rule Devices"
    >
      <RuleDevicesForm
        rule={value.rule}
        selectedDevices={value.selectedDevices}
        deviceOptions={value.deviceOptions}
        onSubmitAction={onSubmit}
      />
    </Drawer>
  );
}
