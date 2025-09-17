import { create } from "zustand";

interface HomeFilterStore {
  selectFilterOption: "WEEKLY" | "MONTHLY" | "YEARLY";
  setSelectFilterOption: (option: "WEEKLY" | "MONTHLY" | "YEARLY") => void;
}

export const useHomeFilterStore = create<HomeFilterStore>((set) => ({
  selectFilterOption: "MONTHLY",
  setSelectFilterOption: (option) => set({ selectFilterOption: option }),
}));
