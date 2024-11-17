import { create } from "zustand";

export type JourneyState = "draw" | "hover" | "erase";

export interface HistorialJourney {
    from: string;
    to: string;
    path: string[];
    cost: number;

    state: JourneyState;
}

interface HistorialState {
    records: HistorialJourney[];
    current: HistorialJourney | null;

    addRecord: (journey: HistorialJourney) => void;
    removeRecord: (journey: HistorialJourney) => void;
    updateRecord: (journey: HistorialJourney) => void;

    setCurrentRecord: (journey: HistorialJourney) => void;
}

export const useHistorial = create<HistorialState>((set, get) => ({
    records: [],
    current: null,

    addRecord: (journey: HistorialJourney) => {
        if (journey.from === journey.to) return; // no son iguales

        const names = new Set([journey.from, journey.to]); // no hay duplicados
        if (get().records.find((r) => names.has(r.from) && names.has(r.to)))
            return;

        set((state) => ({
            records: [...state.records, journey],
            current: journey,
        }));
    },

    removeRecord: (journey: HistorialJourney) => {
        set((state) => ({
            records: state.records.filter(
                (r) => r.from !== journey.from || r.to !== journey.to
            ),
            current: null,
        }));
    },

    updateRecord: (journey: HistorialJourney) =>
        set((state) => ({
            records: state.records.map((r) =>
                r.from === journey.from && r.to === journey.to
                    ? { ...r, state: r.state === "draw" ? "hover" : "draw" }
                    : r
            ),
            current: {
                ...state.current,
                state: state.current?.state === "draw" ? "hover" : "draw",
            } as HistorialJourney,
        })),
    setCurrentRecord: (journey: HistorialJourney) =>
        set(() => ({ current: journey })),
}));
