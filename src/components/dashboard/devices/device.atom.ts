import { atom } from "jotai";
import { Device } from "@/components/dashboard/devices/device.schema";

export const newDeviceDrawerAtom = atom<{
  isOpen: boolean;
  locationId: string;
  deviceTypeId: string;
  controllerId: string | null;
}>({ isOpen: false, locationId: "", deviceTypeId: "", controllerId: null });

export const editDeviceDrawerAtom = atom<{
  isOpen: boolean;
  isDeleteEnabled: boolean;
  device: Device;
}>({
  isOpen: false,
  isDeleteEnabled: false,
  device: {
    name: "",
    mac: "",
    ip: null,
    tailscaleIp: null,
    pin: null,
    serialNumber: "",
    locationId: null,
    deviceTypeId: "",
    controllerId: null,
  },
});
