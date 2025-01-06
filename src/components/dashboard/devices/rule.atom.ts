import { atom } from "jotai";
import { Device, Rule } from "@/components/dashboard/devices/device.schema";

export const newRuleDrawerAtom = atom<{
  isOpen: boolean;
  locationId: string;
  deviceTypeId: string;
  controllerId: string | null;
}>({ isOpen: false, locationId: "", deviceTypeId: "", controllerId: null });

export const editRuleDevicesDrawerAtom = atom<{
  isOpen: boolean;
  rule: Rule;
  selectedDevices: string[];
  deviceOptions: Device[];
}>({
  isOpen: false,
  rule: { name: "", type: "AND", locationId: "", controllerId: "" },
  selectedDevices: [],
  deviceOptions: [],
});
