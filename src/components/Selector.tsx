import { useGraph } from "@/hooks/useGraph";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";

export default function Selector({
    keyword,
    field,
}: {
    keyword: string;
    field: "" | "from" | "to" | "country";
}) {
    const { cities } = useGraph();
    const { setValue } = useFormContext();

    const filtrados = cities.filter((city) =>
        city.city.toLowerCase().includes(keyword.toLowerCase()) || city.country.toLowerCase().includes(keyword.toLowerCase())
    );

    const handleClick = (city: string) => {
        setValue(field, city);
    };

    return (
        <Card onClick={(e) => e.stopPropagation()}>
            <CardHeader>
                <CardTitle>Resultados</CardTitle>
            </CardHeader>
            <CardContent className="max-h-96 overflow-auto">
                <ul className="space-y-2">
                    {filtrados.map((city) => (
                        <li key={city.city + city.country}>
                            <Button
                                className="p-2 w-full"
                                variant="secondary"
                                onClick={() =>
                                    handleClick(city.city + "," + city.country)
                                }
                            >
                                {city.city} - {city.country}
                            </Button>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
