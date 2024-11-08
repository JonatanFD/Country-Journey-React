import { Check, Filter, RotateCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useFilters from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import { useGraph } from "@/hooks/useGraph";
import { getCities, getGraphByFilter, getRoutes } from "@/services/api";
import { Badge } from "./ui/badge";

export default function Filters() {
    const { countries, open, setOpen, setCountries } = useFilters();
    const { setCities, setRoutes } = useGraph();
    const [filters, setFilters] = useState<string[]>([]);

    const checkFilter = (country: string) => {
        return filters.includes(country);
    };

    const handleCloseClick = () => {
        setOpen(false);

        if (0 === filters.length) return handleResetClick();

        // fetch data
        getGraphByFilter(filters)
            .then((data) => {
                setCities(data.cities);
                setRoutes(data.routes);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleResetClick = () => {
        getRoutes().then((data) => {
            setRoutes(data);
        });
        getCities().then((data) => {
            setCities(data);
        });

        setFilters([]);
    };

    const handleCountryClick = (country: string) => {
        setFilters(
            filters.includes(country)
                ? filters.filter((f) => f !== country)
                : [...filters, country]
        );
    };

    useEffect(() => {
        getCities().then((data) => {
            setCountries([...new Set(data.map((city) => city.country))]);
        });
    }, []);

    return (
        <>
            {open ? (
                <Card className="w-96 z-30">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Filtros</CardTitle>

                        <section>
                            <Button
                                onClick={handleResetClick}
                                className="inline-flex"
                                size="icon"
                                variant="ghost"
                            >
                                <RotateCcw />
                            </Button>
                            <Button
                                onClick={handleCloseClick}
                                className="inline-flex"
                                size="icon"
                                variant="ghost"
                            >
                                {filters.length > 0 ? <Check /> : <X />}
                            </Button>
                        </section>
                    </CardHeader>
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
                                            handleCountryClick(country)
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
                <section className="z-30">
                    <Button onClick={() => setOpen(true)}>
                        <Filter />
                    </Button>
                    <section className="flex flex-col gap-1 py-1">
                        {filters.length > 0 &&
                            filters.map((country) => (
                                <Badge key={country}>{country}</Badge>
                            ))}
                    </section>
                </section>
            )}
        </>
    );
}
