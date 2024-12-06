"use client";

import DeviceForm from "@/components/DeviceForm";
import { Modal } from "@/components/Modal";
import { newDeviceAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";

export default function NewDeviceModal() {
  const newDeviceAtomValue = useAtomValue(newDeviceAtom);
  const device = {
    name: "",
    mac: "",
    ip: "",
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
