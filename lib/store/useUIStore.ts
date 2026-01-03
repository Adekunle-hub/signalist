import { create } from "zustand";

interface UiState {
  showSearchModal: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  toggleSearchModal: () => void;
}

export const UseUIStore = create<UiState>((set) => ({
  showSearchModal: false,
  openSearchModal: () => set({ showSearchModal: true }),
  closeSearchModal: () => set({ showSearchModal: false }),
  toggleSearchModal: () =>
    set((state) => ({ showSearchModal: !state.showSearchModal })),
}));
