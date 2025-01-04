"use client";

import { Device } from "@/components/dashboard/devices/device.schema";
import { Card, Group, Text, Badge, Divider } from "@mantine/core";

interface Props {
  device: Device;
}

export default function DeviceCard({ device }: Props) {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Text size="lg">{device.name}</Text>
        <Badge color="blue" variant="light">
          {device.serialNumber}
        </Badge>
      </Group>

      <Divider my="sm" />

      <Text size="sm">MAC Address</Text>
      <Text>{device.mac}</Text>

      <Text size="sm">IP Address</Text>
      <Text>{device.ip || "N/A"}</Text>

      <Text size="sm">Tailscale IP</Text>
      <Text>{device.tailscaleIp || "N/A"}</Text>

      {device.id && (
        <>
          <Divider my="sm" />
          <Text size="sm">Device ID</Text>
          <Text>{device.id}</Text>
        </>
      )}
    </Card>
  );
}
