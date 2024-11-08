import { HistorialRecord } from "@/hooks/useHistorial";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Trash, X } from "lucide-react";
import { Button } from "./ui/button";
import CityProfile from "./CityProfile";
import { Label } from "./ui/label";

export default function Details({ record }: { record: HistorialRecord }) {
    return (
        <Card className="z-30">
            <CardHeader>
                <CardTitle>Detalles de viaje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Label className="block">Origen: {record.from}</Label>
                <Label className="block">Destino: {record.to}</Label>
                <Label className="block">Costo: {record.cost}</Label>
                <ul className="max-h-96 overflow-y-auto overflow-x-hidden">
                    {record.path.map((city, index) => (
                        <li>
                            <CityProfile key={`${city}-${index}`} cityProp={city} />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button size="icon" variant="ghost">
                    <X />
                </Button>
                <Button size="icon" variant="ghost">
                    <Trash />
                </Button>
            </CardFooter>
        </Card>
    );
}
