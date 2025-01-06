import { atom } from "jotai";
import { Device, Rule } from "@/components/dashboard/devices/device.schema";

export const newRuleDrawerAtom = atom<{
  isOpen: boolean;
  locationId: string;
  ruleTypeId: "AND" | "OR";
  controllerId: string;
}>({ isOpen: false, locationId: "", ruleTypeId: "AND", controllerId: "" });

export const editRuleDrawerAtom = atom<{
  isOpen: boolean;
  rule: Rule;
}>({
  isOpen: false,
  rule: {
    id: "",
    name: "",
    type: "AND",
    locationId: "",
    controllerId: "",
  },
});

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
