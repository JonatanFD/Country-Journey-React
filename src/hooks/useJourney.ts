import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";
import { create } from "zustand";

interface JourneyState {
    cost: number;
    path: string[];

    setJourney: (cost : number, path: string[]) => void;
}

export const useJourney = create<JourneyState>((set) => ({
    cost: 0,
    path: [],
    
    setJourney: (cost, path) => set({cost, path})
}))


const formSchema = z.object({
    from: z.string({ message: "Ingresa un origen" }),
    to: z.string({ message: "Ingresa un destino" }),
});

export const useJourneyForm = () =>{
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const [field, setField] = useState< "" | "from" | "to" | "country">("")
    const [keyword, setKeyword] = useState<string>("")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLFormElement>) => {
        setIsSelectorOpen(true); // open selector
        setKeyword(e.target.value);
    }, 300)

    const handleFocus = (e: React.FocusEvent<HTMLFormElement>) => {
        setField(e.target.name as "" | "from" | "to" | "country");
    };
   
    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target instanceof HTMLElement) {
                if (!e.target.closest(".selector")) {
                    setIsSelectorOpen(false);
                }
            }
        });
    }, []);

    return {form, handleChange, handleFocus, isSelectorOpen, field, keyword}
}
