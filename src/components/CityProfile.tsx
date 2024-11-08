import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { getCityProfile } from "@/services/here";
import { HereAPIDATA } from "@/services/hereTypes";
import { getCityImage } from "@/services/pipxabay";

interface CityProfileProps {
    cityProp: string;
}

export default function CityProfile({ cityProp }: CityProfileProps) {
    const [cityProfile, setCityProfile] = useState<HereAPIDATA>({ items: [] });
    const [cityImage, setCityImage] = useState("");

    const handleTriggerClick = () => {
        const [city, country] = cityProp.split(",");

        getCityProfile(city, country).then((data) => {
            setCityProfile(data);
        });

        getCityImage(city, country).then((data) => {
            setCityImage(data[0].url);
        });
    };
    return (
        <Dialog>
            <DialogTrigger className="w-full" asChild>
                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={handleTriggerClick}
                >
                    {cityProp.split(",").join(" - ")}
                </Button>
            </DialogTrigger>

            <DialogContent aria-description="City profile">
                <DialogTitle>Detalles de {cityProp.split(",")[0]}</DialogTitle>

                <section className="flex gap-4">
                    <img src={cityImage} alt="some" className="w-64 h-auto" />
                    {cityProfile.items.length > 0 && (
                        <ul className="flex flex-col space-y-4 max-h-96 overflow-y-auto">
                            {cityProfile.items.map((item) => (
                                <li key={item.id}>
                                    <div>{item.title}</div>
                                    <div>{item.address.label}</div>
                                    <div>{item.position.lat}</div>
                                    <div>{item.position.lng}</div>
                                    <div>
                                        {item.categories
                                            .map((category) => category.name)
                                            .join(", ")}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </DialogContent>
        </Dialog>
    );
}
