"use client";

import { Device, Rule } from "@/components/dashboard/devices/device.schema";
import { Card, Group, Text, Divider, Button, Menu } from "@mantine/core";
import {
  editRuleDevicesDrawerAtom,
  editRuleDrawerAtom,
} from "@/components/dashboard/devices/rule.atom";
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
  const showEditRuleDrawer = useSetAtom(editRuleDrawerAtom);
  const showEditRuleDevicesDrawer = useSetAtom(editRuleDevicesDrawerAtom);

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Text size="lg">{`Rule -> ${rule.name}`}</Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button>More</Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Manage Rule</Menu.Label>
            <Menu.Item
              onClick={() =>
                showEditRuleDrawer({
                  isOpen: true,
                  rule,
                })
              }
            >
              Update Rule
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                showEditRuleDevicesDrawer({
                  isOpen: true,
                  rule,
                  selectedDevices,
                  deviceOptions,
                })
              }
            >
              Select Rule Devices
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
