import { create } from "zustand";

export interface HistorialRecord {
    from: string,
    to: string,
    path: string[],
    cost: number
}

interface State {
    historial: HistorialRecord[];
    addRecord: (record: HistorialRecord) => void;
    removeRecord: (record: HistorialRecord) => void;
}

export const useHistorial = create<State>((set) => ({
    historial: [],
    addRecord: (record: HistorialRecord) => set((state) => ({ historial: [...state.historial, record] })),
    removeRecord: (record: HistorialRecord) => set((state) => ({ historial: state.historial.filter((r) => r.from !== record.from || r.to !== record.to) })),
}))