import { DeviceType } from "@prisma/client";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  locationId?: string;
  groupId?: string;
  deviceType: DeviceType;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
  setLocationId: (locationId: string) => void;
  setGroupId: (groupId: string) => void;
  setDeviceType: (deviceType: DeviceType) => void;
};

const initialState: State = {
  isOpen: false,
  locationId: undefined,
  deviceType: DeviceType.Controller,
};

export const useNewDevice = create<State & Actions>((set) => ({
  ...initialState,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set(initialState),
  setLocationId: (locationId: string) => set({ locationId }),
  setGroupId: (groupId: string) => set({ groupId }),
  setDeviceType: (deviceType: DeviceType) => set({ deviceType }),
}));
