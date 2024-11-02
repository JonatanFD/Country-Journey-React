import { create } from "zustand";

interface State {
    countries: string[];
    setCountries: (countries: string[]) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const useFilters = create<State>((set) => ({
    countries: [],
    setCountries: (countries) => set({ countries }),
    open: false,
    setOpen: (open) => set({ open }),
}))

export default useFilters;
