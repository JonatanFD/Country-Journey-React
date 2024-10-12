import { useGraph } from "@/hooks/useGraph";
import { useJourney } from "@/hooks/useJourney";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";

export default function OptionSelector() {
    const { keyword, field } = useJourney();
    const { cities } = useGraph();
    const [matches, setMatches] = useState<string[]>([]);
    const {setValue} = useFormContext()

    useEffect(() => {
        setMatches(
            cities
                .filter((city) => {
                    if (field === "from" || field === "to") {
                        return city.city
                            .toLowerCase()
                            .includes(keyword.toLowerCase());
                    } else {
                        return city.country
                            .toLowerCase()
                            .includes(keyword.toLowerCase());
                    }
                })
                .map((city) => {
                    return field === "from" || field === "to"
                        ? city.city + "," + city.country
                        : city.country;
                })
        );
    }, [keyword]);

    const onOptionClick = (option: string) => {
        if (field === "from" || field === "to") {
            if (field === "from") {
                setValue("from", option)
            }
            if (field === "to") {
                setValue("to", option)
            }
        } else {
            useJourney.getState().setTo(option);
        }
    };

    return (
        <Card>
            <CardHeader className="text-2xl w-56">Resultados</CardHeader>
            <CardContent>
                <ul className="max-h-96 overflow-auto space-y-2">
                    {matches.map((match) => {
                        return (
                            <li key={match}>
                                <Button onClick={() => onOptionClick(match)} className="w-full" variant="secondary">
                                    {match}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </CardContent>
        </Card>
    );
}
