"use client";

import { Device, Rule } from "@/components/dashboard/devices/device.schema";
import { Card, Group, Text, Divider, Button } from "@mantine/core";
// import { editRuleDrawerAtom } from "@/components/dashboard/devices/device.atom";
// import { useSetAtom } from "jotai";

interface Props {
  rule: Rule;
  devices: Device[];
}

export default function RuleCard({ rule, devices }: Props) {
  // const showEditRuleDrawer = useSetAtom(editRuleDrawerAtom);
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Text size="lg">{`Rule -> ${rule.name}`}</Text>
        <Button
        // onClick={() =>
        //   showEditRuleDrawer({ isOpen: true, isDeleteEnabled, rule })
        // }
        >
          Edit
        </Button>
      </Group>

      <Divider my="sm" />

      {devices.map((device) => (
        <Text key={device.id} size="sm">
          {device.name}
        </Text>
      ))}

      {rule.id && (
        <>
          <Divider my="sm" />
          <Text size="sm">Rule ID</Text>
          <Text>{rule.id}</Text>
        </>
      )}
    </Card>
  );
}
