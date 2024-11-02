import { Check, Filter, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useFilters from "@/hooks/useFilters";
import { useState } from "react";
import { useGraph } from "@/hooks/useGraph";
import { getGraphByFilter } from "@/services/api";

export default function Filters() {
    const { countries, open, setOpen } = useFilters();
    const {setCities, setRoutes} = useGraph();
    const [filters, setFilters] = useState<string[]>([]);

    const checkFilter = (country: string) => {
        return filters.includes(country);
    };

    const handleCloseClick = () => {
        setOpen(false);

        if (0 === filters.length) return;

        // fetch data
        getGraphByFilter().then((data) => {
            setCities(data.cities);
            setRoutes(data.routes);
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <section className="left-0 right-0 mx-auto max-w-96 absolute flex justify-center mt-4">
            {open ? (
                <Card className="w-96 z-30">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Filtros</CardTitle>
                        <Button
                            onClick={handleCloseClick}
                            className="inline-flex"
                            size="icon"
                            variant="ghost"
                        >
                            {filters.length > 0 ? <Check /> : <X />}
                        </Button>
                    </CardHeader>
                    {filters.join(", ")}
                    <CardContent>
                        <ul>
                            {countries.map((country) => (
                                <li key={country}>
                                    <Button
                                        variant="ghost"
                                        className={`w-full ${
                                            checkFilter(country)
                                                ? "bg-zinc-800"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            setFilters(
                                                filters.includes(country)
                                                    ? filters.filter(
                                                          (f) => f !== country
                                                      )
                                                    : [...filters, country]
                                            )
                                        }
                                    >
                                        {country}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ) : (
                <Button onClick={() => setOpen(true)} className="z-30">
                    <Filter />
                </Button>
            )}
        </section>
    );
}
