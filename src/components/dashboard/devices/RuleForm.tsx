"use client";

import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons-react";
import { type ActionResponse } from "@/data-access/serverAction.schema";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, Select, TextInput } from "@mantine/core";
import { Rule, ruleSchema } from "@/components/dashboard/devices/device.schema";

type Props = {
  rule: Rule;
  onSubmitAction: (values: Rule) => Promise<ActionResponse>;
  onDelete?: () => void;
};

export default function RuleForm({ rule, onSubmitAction, onDelete }: Props) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: rule,
    validate: zodResolver(ruleSchema),
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
        placeholder="Garden"
        required
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Select
        label="Rule Type"
        placeholder="Select rule type"
        required
        data={["AND", "OR"]}
        key={form.key("type")}
        {...form.getInputProps("type")}
      />
      <Button fullWidth mt="xl" type="submit">
        {rule.id ? "Update" : "Create"}
      </Button>
      {rule.id && (
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
