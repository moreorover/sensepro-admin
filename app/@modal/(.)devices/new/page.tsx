"use client";

import DeviceForm from "@/components/DeviceForm";
import { Modal } from "@/components/Modal";
import { newDeviceAtom } from "@/lib/atoms";
import { faker } from "@faker-js/faker";
import { useAtomValue } from "jotai";

export default function NewDeviceModal() {
  const newDeviceAtomValue = useAtomValue(newDeviceAtom);
  const device =
    process.env.NODE_ENV === "development"
      ? {
          name: "",
          mac: faker.internet.mac(),
          ip: faker.internet.ipv4(),
          tailscaleIp: "",
          serialNumber: faker.string.ulid(),
          locationId: newDeviceAtomValue.locationId,
          controllerId: newDeviceAtomValue.controllerId,
          deviceTypeId: newDeviceAtomValue.deviceType,
        }
      : {
          name: "",
          mac: "",
          ip: "",
          tailscaleIp: "",
          serialNumber: "",
          locationId: newDeviceAtomValue.locationId,
          controllerId: newDeviceAtomValue.controllerId,
          deviceTypeId: newDeviceAtomValue.deviceType,
        };

  return (
    <Modal title="New Device" description="Create device as needed.">
      <div className="p-2 max-w-md">
        <DeviceForm device={device} />
      </div>
    </Modal>
  );
}
