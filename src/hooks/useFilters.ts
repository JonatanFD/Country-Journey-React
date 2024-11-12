import { create } from "zustand";

interface State {
    countries: string[];
    setCountries: (countries: string[]) => void;
    open: boolean;
    setOpen: (open: boolean) => void;

    filters: string[];
    setFilters: (filters: string[]) => void;
}

const useFilters = create<State>((set) => ({
    countries: [],
    setCountries: (countries) => set({ countries }),
    open: false,
    setOpen: (open) => set({ open }),

    filters: [],
    setFilters: (filters) => set({ filters }),
}))

export default useFilters;
