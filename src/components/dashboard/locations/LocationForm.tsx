"use client";

import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type ActionResponse } from "@/data-access/serverAction.schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, TextInput } from "@mantine/core";
import {
  Location,
  locationSchema,
} from "@/components/dashboard/locations/location.schema";

type Props = {
  location: Location;
  onSubmitAction: (values: Location) => Promise<ActionResponse>;
  onDelete?: () => void;
};

export default function LocationForm({
  location,
  onSubmitAction,
  onDelete,
}: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: location,
    validate: zodResolver(locationSchema),
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
        label="Location Name"
        placeholder="1 High Street, Peterborough"
        required
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Button fullWidth mt="xl" type="submit">
        {location.id ? "Update" : "Create"}
      </Button>
      {location.id && (
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
