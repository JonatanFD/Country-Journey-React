import { useHistorial } from "@/hooks/useHistorial";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function Historial() {
    const { historial } = useHistorial();

    return (
        <>
            {historial.length > 0 && (
                <Card className="absolute right-4 top-4 z-30">
                    <CardHeader>
                        <CardTitle>Historial de viajes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            {historial.map((record) => (
                                <li key={record.from + record.to}>
                                    <Button variant="ghost">
                                        {record.from} - {record.to}
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
