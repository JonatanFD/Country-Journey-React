import { create } from "zustand";

interface JourneyState {
    from: string;
    setFrom: (from: string) => void;

    to: string;
    setTo: (to: string) => void;

    cost: number;
    path: string[];

    setJourney: (cost : number, path: string[]) => void;
}

export const useJourney = create<JourneyState>((set) => ({
    from: "",
    setFrom: (from: string) => set({ from }),

    to: "",
    setTo: (to: string) => set({ to }),

    cost: 0,
    path: [],
    
    setJourney: (cost, path) => set({cost, path})
}))




