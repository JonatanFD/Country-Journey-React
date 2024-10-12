import { z } from "zod";
import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import OptionSelector from "./OptionSelector";
import { useJourney } from "@/hooks/useJourney";
import { getJourney } from "@/services/api";

const formSchema = z.object({
    from: z.string({ message: "El origen es requerido" }),
    to: z.string({ message: "El destino es requerido" }),
    filters: z.string().optional(),
});

export default function JourneyForm() {
    const [openSelector, setOpenSelector] = useState(false);
    const { setKeyword, setField, setJourney } =
        useJourney();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // handle input change
    const onInputChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOpenSelector(true);
        const targetValue = e.target.value;

        setKeyword(targetValue);

        if (!targetValue) {
            setOpenSelector(false);
        }
        const targetName = e.target.name;

        if (targetName === "from" || targetName === "to") {
            setField(targetName);
        } else {
            setField("country");
        }
    };

    // handle input focus
    const onInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const targetName = e.target.name;

        if (targetName === "from" || targetName === "to") {
            setField(targetName);
        } else {
            setField("country");
        }
    };

    // handle onSubmit
    const onSubmit = form.handleSubmit((data) => {
        try {
            getJourney({ from: data.from, to: data.to, countries: [] }).then(
                (res) => {
                    setJourney(res.cost, res.path);
                }
            );
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (!(e.target as HTMLElement).closest("#form")) {
                setOpenSelector(false);
            }
        });
    }, []);

    return (
        <section className="absolute top-4 left-4 z-30 flex space-x-4">
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle className="text-2xl">Buscar viaje</CardTitle>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Origen</FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                onChange={onInputChangeValue}
                                                onFocus={onInputFocus}
                                                autoComplete="off"
                                                id="form"
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
                                                onChange={onInputChangeValue}
                                                onFocus={onInputFocus}
                                                autoComplete="off"
                                                id="to"
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
                {openSelector && <OptionSelector />}
            </FormProvider>
        </section>
    );
}
