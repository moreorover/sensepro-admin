import { create } from "zustand";

type State = {
  isOpen: boolean;
  locationId?: string;
  groupId?: string;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
  setLocationId: (locationId: string) => void;
  setGroupId: (groupId: string) => void;
};

const initialState: State = {
  isOpen: false,
  locationId: undefined,
};

export const useNewDevice = create<State & Actions>((set) => ({
  ...initialState,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set(initialState),
  setLocationId: (locationId: string) => set({ locationId }),
  setGroupId: (groupId: string) => set({ groupId }),
}));
