import { create } from "zustand";

type State = {
  isOpen: boolean;
  customerId?: string;
};

type Actions = {
  onOpen: () => void;
  onClose: () => void;
  setCustomerId: (customerId: string) => void;
};

const initialState: State = {
  isOpen: false,
  customerId: undefined,
};

export const useNewLocations = create<State & Actions>((set) => ({
  ...initialState,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set(initialState),
  setCustomerId: (customerId: string) => set({ customerId }),
}));
