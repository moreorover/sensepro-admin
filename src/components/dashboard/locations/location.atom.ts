import { atom } from "jotai";
import { Location } from "@/components/dashboard/locations/location.schema";

export const newLocationDrawerAtom = atom<{
  isOpen: boolean;
  customerId: string;
}>({ isOpen: false, customerId: "" });

export const editLocationDrawerAtom = atom<{
  isOpen: boolean;
  location: Location;
}>({ isOpen: false, location: { name: "", customerId: "" } });
