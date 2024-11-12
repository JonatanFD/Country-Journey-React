import { HistorialRecord, useHistorial } from "@/hooks/useHistorial";
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

export default function Details({ record, close }: { record: HistorialRecord, close: () => void }) {

    const {removeRecord} = useHistorial()

    return (
        <Card className="z-30">
            <CardHeader className="flex justify-between flex-row items-center">
                <CardTitle>Detalles de viaje</CardTitle>
                <Button size="icon" variant="ghost" onClick={close}>
                    <X />
                </Button>
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
            <CardFooter className="flex justify-end">
                <Button size="icon" variant="destructive" onClick={() => removeRecord(record)}>
                    <Trash stroke="#FF453A"/>
                </Button>
            </CardFooter>
        </Card>
    );
}
