import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import Selector from "./Selector";
import { useJourney } from "@/hooks/useJourney";

const formSchema = z.object({
    from: z.string({ message: "Ingresa un origen" }),
    to: z.string({ message: "Ingresa un destino" }),
});

export default function JourneyFormRefactor() {
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const { setKeyword, keyword, setField, field } = useJourney();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setIsSelectorOpen(true); // open selector
        setKeyword(e.target.value);
    };

    const handleFocus = (e: React.FocusEvent<HTMLFormElement>) => {
        setField(e.target.name as "" | "from" | "to" | "country");
    };

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
    });

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target instanceof HTMLElement) {
                if (!e.target.closest(".selector")) {
                    setIsSelectorOpen(false);
                }
            }
        });
    }, []);

    return (
        <div className="absolute top-4 left-4 flex gap-4 z-30 h-fit">
            <Card className="w-fit" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                    <CardTitle>Formulario de viaje</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={onSubmit}
                            className="space-y-4"
                            onChange={handleChange}
                            onFocus={handleFocus}
                        >
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Origen</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                autoComplete="off"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="to"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Destino</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                autoComplete="off"
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full">Buscar</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <FormProvider {...form}>
                {isSelectorOpen && <Selector keyword={keyword} field={field} />}
            </FormProvider>
        </div>
    );
}