import { create } from "zustand";

interface JourneyState {
    keyword: string;
    setKeyword: (keyword: string) => void;

    from: string;
    setFrom: (from: string) => void;

    to: string;
    setTo: (to: string) => void;

    field:"" | "from" | "to" | "country";
    setField: (field: "" | "from" | "to" | "country") => void;

    cost: number;
    path: string[];

    setJourney: (cost : number, path: string[]) => void;
}

export const useJourney = create<JourneyState>((set) => ({
    keyword: "",
    setKeyword: (keyword: string) => set({ keyword }),

    from: "",
    setFrom: (from: string) => set({ from }),

    to: "",
    setTo: (to: string) => set({ to }),

    field: "",
    setField: (field: "" | "from" | "to" | "country") => set({field}),

    cost: 0,
    path: [],
    
    setJourney: (cost, path) => set({cost, path})
}))




