"use client";

import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type ActionResponse } from "@/data-access/serverAction.schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, MultiSelect, TextInput } from "@mantine/core";
import {
  Rule,
  Device,
  ruleDevicesSchema,
  RuleDevices,
} from "@/components/dashboard/devices/device.schema";

type Props = {
  selectedDevices: string[];
  deviceOptions: Device[];
  onSubmitAction: (values: RuleDevices) => Promise<ActionResponse>;
};

export default function RuleDevicesForm({
  selectedDevices,
  deviceOptions,
  onSubmitAction,
}: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { selectedDevices },
    validate: zodResolver(ruleDevicesSchema),
  });

  async function handleSubmit(values: typeof form.values) {
    await onSubmitAction(values);
  }

  const data = deviceOptions.map((device) => ({
    value: device.id!,
    label: device.name,
  }));

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <MultiSelect
        label="Select devices"
        placeholder="Pick device"
        // defaultValue={selectedDevices}
        data={data}
        key={form.key("selectedDevices")}
        {...form.getInputProps("selectedDevices")}
      />
      <Button fullWidth mt="xl" type="submit">
        Save
      </Button>
    </form>
  );
}
