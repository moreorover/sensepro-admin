"use client";

import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type ActionResponse } from "@/data-access/serverAction.schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, TextInput } from "@mantine/core";
import {
  Device,
  deviceSchema,
} from "@/components/dashboard/devices/device.schema";

type Props = {
  device: Device;
  onSubmitAction: (values: Device) => Promise<ActionResponse>;
  onDelete?: () => void;
  isDeleteEnabled: boolean;
};

export default function DeviceForm({
  device,
  onSubmitAction,
  onDelete,
  isDeleteEnabled,
}: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: device,
    validate: zodResolver(deviceSchema),
  });

  async function handleSubmit(values: typeof form.values) {
    await onSubmitAction(values);
  }

  function handleDelete() {
    if (!!onDelete) onDelete();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        label="Name"
        placeholder="Front camera"
        required
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Device MAC Address"
        placeholder="2C:54:91:88:C9:E3"
        required
        key={form.key("mac")}
        {...form.getInputProps("mac")}
      />
      {device.deviceTypeId === "controller" && (
        <TextInput
          label="Device TailScale IP Address"
          placeholder="100.73.55.87"
          key={form.key("tailscaleIp")}
          {...form.getInputProps("tailscaleIp")}
        />
      )}
      <TextInput
        label="Device Serial number"
        placeholder="20230715-001-123"
        required
        key={form.key("serialNumber")}
        {...form.getInputProps("serialNumber")}
      />
      <Button fullWidth mt="xl" type="submit">
        {device.id ? "Update" : "Create"}
      </Button>
      {isDeleteEnabled && (
        <Button
          leftSection={<IconTrash />}
          fullWidth
          mt="xl"
          type="button"
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      )}
    </form>
  );
}
