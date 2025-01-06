"use client";

import RuleForm from "@/components/dashboard/devices/RuleForm";
import { Rule } from "@/components/dashboard/devices/device.schema";
import { notifications } from "@mantine/notifications";
import { deleteRule, updateRule } from "@/data-access/rule";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { editRuleDrawerAtom } from "@/components/dashboard/devices/rule.atom";

export default function EditRuleDrawer() {
  const [value, setOpen] = useAtom(editRuleDrawerAtom);

  async function onSubmit(data: Rule) {
    const response = await updateRule(data);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to update Rule",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        rule: {
          id: "",
          name: "",
          type: "AND",
          locationId: null,
          controllerId: null,
        },
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Rule updated.",
      });
    }
    return response;
  }

  async function onDelete() {
    const response = await deleteRule(value.rule);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to delete Rule",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        rule: {
          id: "",
          name: "",
          type: "AND",
          locationId: null,
          controllerId: null,
        },
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Rule deleted.",
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
          rule: {
            id: "",
            name: "",
            type: "AND",
            locationId: null,
            controllerId: null,
          },
        })
      }
      position="right"
      title="Update Rule"
    >
      <RuleForm
        onSubmitAction={onSubmit}
        onDelete={onDelete}
        rule={value.rule}
      />
    </Drawer>
  );
}
