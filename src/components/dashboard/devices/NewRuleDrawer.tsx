"use client";

import RuleForm from "@/components/dashboard/devices/RuleForm";
import { Rule } from "@/components/dashboard/devices/device.schema";
import { notifications } from "@mantine/notifications";
import { createRule } from "@/data-access/rule";
import { Drawer } from "@mantine/core";
import { useAtom } from "jotai";
import { newRuleDrawerAtom } from "@/components/dashboard/devices/rule.atom";

export default function NewRuleDrawer() {
  const [value, setOpen] = useAtom(newRuleDrawerAtom);

  async function onSubmit(data: Rule) {
    const response = await createRule(data);

    if (response.type === "ERROR") {
      notifications.show({
        color: "red",
        title: "Failed to create Rule",
        message: "Please try again.",
      });
    } else {
      setOpen({
        isOpen: false,
        locationId: "",
        ruleTypeId: "AND",
        controllerId: "",
      });
      notifications.show({
        color: "green",
        title: "Success!",
        message: "Rule created.",
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
          locationId: "",
          ruleTypeId: "AND",
          controllerId: "",
        })
      }
      position="right"
      title="Create Rule"
    >
      <RuleForm
        onSubmitAction={onSubmit}
        rule={{
          name: "",
          type: value.ruleTypeId,
          locationId: value.locationId,
          controllerId: value.controllerId,
        }}
      />
    </Drawer>
  );
}
