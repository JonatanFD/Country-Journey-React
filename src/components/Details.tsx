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

    const {removeRecord, setCurrentPath} = useHistorial()

    const onEraseClick = () => {
        removeRecord(record);
        setCurrentPath(record.path);
    }

    return (
        <Card className="z-30">
            <CardHeader className="flex justify-between flex-row items-center relative">
                <CardTitle>Detalles de viaje</CardTitle>
                <Button variant="ghost" onClick={close} size="icon" className="absolute top-3 right-3">
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
                            <CityProfile key={`${city}-${index}-${Math.random()}`} cityProp={city} />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button size="icon" variant="destructive" onClick={onEraseClick}>
                    <Trash stroke="#FF453A"/>
                </Button>
            </CardFooter>
        </Card>
    );
}
