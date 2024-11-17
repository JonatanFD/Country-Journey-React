import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Eye, Trash, X } from "lucide-react";
import { Button } from "./ui/button";
import CityProfile from "./CityProfile";
import { Label } from "./ui/label";
import { HistorialJourney, useHistorial } from "@/hooks/useHistorial";
import { useState } from "react";

export default function Details({
    record,
    close,
}: {
    record: HistorialJourney;
    close: () => void;
}) {
    const { updateRecord, setCurrentRecord } = useHistorial();
    const [show, setShow] = useState(false);

    const onEraseClick = () => {
        setCurrentRecord({ ...record, state: "erase" });
        close();
    };

    const onHoverClick = () => {
        updateRecord(record);
        setShow(!show);
    };

    return (
        <Card className="z-30">
            <CardHeader className="flex justify-between flex-row items-center relative">
                <CardTitle>Detalles de viaje</CardTitle>
                <Button
                    variant="ghost"
                    onClick={close}
                    size="icon"
                    className="absolute top-3 right-3"
                >
                    <X />
                </Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <Label className="block">Origen: {record.from}</Label>
                <Label className="block">Destino: {record.to}</Label>
                <Label className="block">Costo: {record.cost}</Label>
                <ul className="max-h-96 overflow-y-auto overflow-x-hidden">
                    {record.path.map((city) => (
                        <li key={`${Math.random()}`}>
                            <CityProfile cityProp={city} />
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="flex justify-end flex-col space-y-4">
                <Button
                    className="w-full space-x-3 text-opacity-65"
                    onClick={onHoverClick}
                >
                    <span>
                        {show ? "Ocultar" : "Observar"}
                    </span>
                    <Eye stroke="black" />
                </Button>

                <Button
                    variant="destructive"
                    className="w-full space-x-3 text-opacity-65"
                    onClick={onEraseClick}
                >
                    Eliminar
                    <Trash stroke="white" />
                </Button>
            </CardFooter>
        </Card>
    );
}
