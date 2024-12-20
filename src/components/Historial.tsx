import { HistorialJourney, useHistorial } from "@/hooks/useHistorial";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import Details from "./Details";

export default function Historial() {
    const { records } = useHistorial();
    const [details, setDetails] = useState<HistorialJourney | null>(null);

    const closeDetails = () => setDetails(null);

    return (
        <>
            {records.length > 0 && (
                <section className="absolute right-4 top-4 flex gap-4">
                    {details && (
                        <Details record={details} close={closeDetails} />
                    )}
                    <Card className="h-fit z-30">
                        <CardHeader>
                            <CardTitle>Historial de viajes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul>
                                {records.map((record) => (
                                    <li key={record.from + record.to}>
                                        <Button
                                            variant="ghost"
                                            onClick={() => setDetails(record)}
                                        >
                                            {record.from} - {record.to}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            )}
        </>
    );
}
