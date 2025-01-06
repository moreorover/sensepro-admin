"use client";

import { Device, Rule } from "@/components/dashboard/devices/device.schema";
import { Card, Group, Text, Divider, Button } from "@mantine/core";
import { editRuleDevicesDrawerAtom } from "@/components/dashboard/devices/rule.atom";
import { useSetAtom } from "jotai";

interface Props {
  rule: Rule;
  devices: Device[];
  selectedDevices: string[];
  deviceOptions: Device[];
}

export default function RuleCard({
  rule,
  devices,
  selectedDevices,
  deviceOptions,
}: Props) {
  const showEditRuleDevicesDrawer = useSetAtom(editRuleDevicesDrawerAtom);

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Text size="lg">{`Rule -> ${rule.name}`}</Text>
        <Group gap="sm">
          <Button
            onClick={() =>
              showEditRuleDevicesDrawer({
                isOpen: true,
                rule,
                selectedDevices,
                deviceOptions,
              })
            }
          >
            Edit
          </Button>
          <Button>Delete</Button>
        </Group>
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
