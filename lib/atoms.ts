import { atom } from "jotai";

export const newDeviceAtom = atom<{
  locationId: string | null;
  controllerId: string | null;
  deviceType: string;
}>({ locationId: "", controllerId: null, deviceType: "controller" });

export const newRuleAtom = atom<{
  type: "AND" | "OR";
  controllerId: string;
  locationId: string;
}>({
  type: "AND",
  controllerId: "",
  locationId: "",
});
