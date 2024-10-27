import { create } from "zustand";
// para fines de desarrollo
interface State {
    nombre: string;
    setNombre: (nombre: string) => void;
}

export const useSelector = create<State>((set) => ({
    nombre: "---",
    setNombre: (nombre: string) => set({ nombre }),
}));