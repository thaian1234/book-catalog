import { create } from "zustand";

type AddBookState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useAddBookStore = create<AddBookState>((set) => ({
  isOpen: false,
  onOpen() {
    set({ isOpen: true });
  },
  onClose() {
    set({ isOpen: false });
  },
}));
