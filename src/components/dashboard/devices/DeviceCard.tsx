"use client";

import { Device } from "@/components/dashboard/devices/device.schema";
import { Card, Group, Text, Badge, Divider, Button } from "@mantine/core";
import { editDeviceDrawerAtom } from "@/components/dashboard/devices/device.atom";
import { useSetAtom } from "jotai";

interface Props {
  device: Device;
  isDeleteEnabled?: boolean;
}

export default function DeviceCard({ device, isDeleteEnabled = true }: Props) {
  const showEditDeviceDrawer = useSetAtom(editDeviceDrawerAtom);
  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" align="center" gap="sm">
        <Text size="lg">{device.name}</Text>
        <Badge color="blue" variant="light">
          {device.serialNumber}
        </Badge>
        <Button
          onClick={() =>
            showEditDeviceDrawer({ isOpen: true, isDeleteEnabled, device })
          }
        >
          Edit
        </Button>
      </Group>

      <Divider my="sm" />

      <Text size="sm">MAC Address</Text>
      <Text>{device.mac}</Text>

      <Text size="sm">IP Address</Text>
      <Text>{device.ip || "N/A"}</Text>

      {device.deviceTypeId === "controller" && (
        <>
          <Text size="sm">Tailscale IP</Text>
          <Text>{device.tailscaleIp || "N/A"}</Text>
        </>
      )}

      {device.deviceTypeId !== "controller" && (
        <>
          <Text size="sm">Pin</Text>
          <Text>{device.pin || "N/A"}</Text>
        </>
      )}

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
