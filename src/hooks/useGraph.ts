import { City, Route } from "@/types";
import { create } from "zustand";

interface GraphState {
    cities: City[];
    setCities: (cities: City[]) => void;

    routes: Route[];
    setRoutes: (routes: Route[]) => void;
}


export const useGraph = create<GraphState>((set) => ({
    cities: [],
    setCities: (cities) => set({ cities }),
    routes: [],
    setRoutes: (routes) => set({ routes }),
}));