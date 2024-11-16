import { FormProvider } from "react-hook-form";
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
import Selector from "./Selector";
import { useJourneyForm } from "@/hooks/useJourney";
import { getJourney } from "@/services/api";
import { HistorialJourney, useHistorial } from "@/hooks/useHistorial";
import Filters from "./Filters";
import useFilters from "@/hooks/useFilters";

export default function JourneyForm() {
    const { form, handleChange, handleFocus, isSelectorOpen, field, keyword } =
        useJourneyForm();
    const { addRecord } = useHistorial();
    const { filters } = useFilters();

    const onSubmit = form.handleSubmit((data) => {
        try {
            getJourney({
                from: data.from,
                to: data.to,
                countries: filters,
            }).then((res) => {
                const record: HistorialJourney = {
                    from: data.from,
                    to: data.to,
                    cost: Math.round(res.cost),
                    path: res.path,
                    state: "draw",
                };
                addRecord(record);
            });
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div className="absolute top-4 left-4 flex gap-4  h-fit">
            <Card
                className="w-fit h-fit z-30"
                onClick={(e) => e.stopPropagation()}
            >
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

            <Filters />
        </div>
    );
}
