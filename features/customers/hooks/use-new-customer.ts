import { create } from "zustand";

type NewCustomersState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewCustomers = create<NewCustomersState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
