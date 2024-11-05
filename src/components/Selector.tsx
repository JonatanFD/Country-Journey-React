import { useGraph } from "@/hooks/useGraph";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { memo } from "react";

const Selector = memo(
    ({
        keyword,
        field,
    }: {
        keyword: string;
        field: "" | "from" | "to" | "country";
    }) => {
        const { cities } = useGraph();
        const { setValue } = useFormContext();

        const filtrados = cities.filter(
            (city) =>
                city.city.toLowerCase().includes(keyword.toLowerCase()) ||
                city.country.toLowerCase().includes(keyword.toLowerCase())
        );

        const handleClick = (city: string) => {
            setValue(field, city);
        };

        return (
            <>
                {filtrados.length > 0 && (
                    <Card onClick={(e) => e.stopPropagation()} className="h-fit z-30">
                        <CardHeader>
                            <CardTitle>Resultados</CardTitle>
                        </CardHeader>
                        <CardContent className="max-h-96 overflow-auto">
                            <ul className="space-y-2">
                                {filtrados.map((city) => (
                                    <li key={city.city + city.country}>
                                        <Button
                                            variant="ghost"
                                            onClick={() =>
                                                handleClick(
                                                    city.city +
                                                        "," +
                                                        city.country
                                                )
                                            }
                                            className="w-full"
                                        >
                                            {city.city} - {city.country}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </>
        );
    }
);

export default Selector;
