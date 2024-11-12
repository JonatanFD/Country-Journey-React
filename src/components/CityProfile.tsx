import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { getCityProfile } from "@/services/here";
import { HereAPIDATA } from "@/services/hereTypes";
import { getCityImage } from "@/services/pipxabay";
import DetailSkeleton from "./DetailSkeleton";
import CityDetail from "./CityDetail";

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

                {cityImage === "" && cityProfile.items.length === 0 ? (
                    <DetailSkeleton />
                ) : (
                    <CityDetail
                        cityImage={cityImage}
                        cityProfile={cityProfile}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}
