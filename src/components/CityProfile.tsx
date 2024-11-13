import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { getCityProfile } from "@/services/here";
import { HereAPIDATA } from "@/services/hereTypes";
import { getCityImage } from "@/services/pipxabay";
import DetailSkeleton from "./DetailSkeleton";
import CityDetail from "./CityDetail";
import { getCityDescription } from "@/services/wiki";
import { WikiApi } from "@/services/wikiTypes";

interface CityProfileProps {
    cityProp: string;
}

export default function CityProfile({ cityProp }: CityProfileProps) {
    const [cityProfile, setCityProfile] = useState<HereAPIDATA>({ items: [] });
    const [cityImage, setCityImage] = useState("");
    const [cityDescription, setCityDescription] = useState<WikiApi | null>(null);

    const handleTriggerClick = () => {
        const [city, country] = cityProp.split(",");
        
        Promise.all([
            getCityDescription(city, country),
            getCityProfile(city, country),
            getCityImage(city, country)
        ]).then(([descriptionData, profileData, imageData]) => {
            setCityDescription(descriptionData);
            setCityProfile(profileData);
            setCityImage(imageData[0].url);
        }).catch((error) => {
            console.error("Error al cargar los datos:", error);
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

                {cityImage === "" && cityProfile.items.length === 0 && cityDescription === null ? (
                    <DetailSkeleton />
                ) : (
                    <CityDetail
                        cityImage={cityImage}
                        cityProfile={cityProfile}
                        cityDescription={cityDescription as WikiApi}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
