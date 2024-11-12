import { HereAPIDATA } from "@/services/hereTypes";

export default function CityDetail({
    cityImage,
    cityProfile,
}: {
    cityImage: string;
    cityProfile: HereAPIDATA;
}) {

    console.log(cityProfile.items);
    
    return (
        <section className="flex gap-4 flex-row">
            <img src={cityImage} alt="some" className="max-w-sm" />
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
    );
}
