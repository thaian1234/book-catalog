import { create } from "zustand";

type UpdateBookState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useUpdateBookStore = create<UpdateBookState>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
