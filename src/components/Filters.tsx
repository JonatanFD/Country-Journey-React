import { Check, Filter, RotateCcw, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useFilters from "@/hooks/useFilters";
import { useEffect, useState } from "react";
import { useGraph } from "@/hooks/useGraph";
import { getCities, getGraphByFilter, getRoutes } from "@/services/api";
import { Badge } from "./ui/badge";

function areTheSameFilters(filters1: string[], filters2: string[]) {
    return (
        filters1.length === filters2.length &&
        filters1.every((f) => filters2.includes(f))
    );
}

export default function Filters() {
    const { countries, open, setOpen, setCountries, filters, setFilters } =
        useFilters();
    const { setCities, setRoutes } = useGraph();

    const [temporalFilters, setTemporalFilters] = useState<string[]>([
        ...filters,
    ]);

    const applyFilters = () => {
        if (temporalFilters.length === 0) {
            onResetClick();
            setOpen(false);
            return;
        }

        getGraphByFilter(temporalFilters)
            .then((data) => {
                setCities(data.cities);
                setRoutes(data.routes);
            })
            .catch((error) => {
                console.log(error);
            });
        setFilters(temporalFilters);
        setOpen(false);
    };

    const onResetClick = () => {
        getRoutes().then((data) => {
            setRoutes(data);
        });
        getCities().then((data) => {
            setCities(data);
        });

        setFilters([]);
    };
    const onCountryClick = (country: string) => {
        setTemporalFilters(
            temporalFilters.includes(country)
                ? temporalFilters.filter((f) => f !== country)
                : [...temporalFilters, country]
        );
    };
    const onCloseClick = () => {
        setOpen(false);
    };

    const checkFilter = (country: string) => {
        return temporalFilters.includes(country);
    };
    useEffect(() => {
        getCities().then((data) => {
            setCountries([...new Set(data.map((city) => city.country))]);
        });
    }, []);

    useEffect(() => {
        if (areTheSameFilters(filters, temporalFilters)) return;
        setTemporalFilters([...filters]);
    }, [open]);

    return (
        <>
            {open ? (
                <Card className="w-96 z-30">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Filtros</CardTitle>

                        <section>
                            <Button
                                onClick={onResetClick}
                                className="inline-flex"
                                size="icon"
                                variant="ghost"
                            >
                                <RotateCcw />
                            </Button>

                            {areTheSameFilters(filters, temporalFilters) ? (
                                <Button
                                    onClick={onCloseClick}
                                    className="inline-flex"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <X />
                                </Button>
                            ) : (
                                <Button
                                    onClick={applyFilters}
                                    className="inline-flex"
                                    size="icon"
                                    variant="ghost"
                                >
                                    <Check />
                                </Button>
                            )}
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
                                        onClick={() => onCountryClick(country)}
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
