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
import { useJourney, useJourneyForm } from "@/hooks/useJourney";
import { getJourney } from "@/services/api";


export default function JourneyForm() {
    const { setJourney } = useJourney();
    const { form, handleChange, handleFocus, isSelectorOpen, field, keyword } = useJourneyForm();

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
