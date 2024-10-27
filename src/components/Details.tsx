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

export default function Details({ record }: { record: HistorialRecord }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Detalles de viaje</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Origen: {record.from}</p>
                <p>Destino: {record.to}</p>
                <p>Costo: {record.cost}</p>
                <ul className="max-h-96 overflow-auto">
                    {record.path.map((city, index) => (
                        <li key={index}>{city}</li>
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
