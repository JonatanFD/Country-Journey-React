import { HereAPIDATA, Phone, Www } from "@/services/hereTypes";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { WikiApi } from "@/services/wikiTypes";

function ContactInfo({
    contacts,
}: {
    contacts: HereAPIDATA["items"][0]["contacts"] | undefined;
}) {
    if (!contacts) return null;

    let telephone: Phone | null = null;
    let website: Www | null = null;

    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].phone) {
            telephone = contacts[i].phone[0];
        }
        if (contacts[i].www) {
            website = contacts[i].www?.[0] ?? null;
        }
    }

    return (
        <>
            {telephone && <Label>Teléfono: {telephone.value}</Label>}
            {website && (
                <p className="truncate text-ellipsis text-sm font-medium leading-none">
                    Sitio web:{" "}
                    <a href={website.value} target="_blank" rel="noreferrer">
                        {website.value}
                    </a>
                </p>
            )}
        </>
    );
}

export default function CityDetail({
    cityImage,
    cityProfile,
    cityDescription,
}: {
    cityImage: string;
    cityProfile: HereAPIDATA;
    cityDescription: WikiApi;
}) {

    console.log("descripcion", cityDescription);
    
    return (
        <section className="flex gap-4 flex-row">
            <div className="w-1/2">
                <img
                    src={cityDescription?.thumbnail?.source ?? cityImage}
                    alt="some"
                    className="w-full rounded-xl"
                />

                <h1>{cityDescription.title}</h1>
                <p>{cityDescription.extract}</p>
            </div>

            <div className="w-1/2">
                {cityProfile.items.length > 0 && (
                    <ul className="flex flex-col space-y-8 max-h-96 overflow-y-auto">
                        {cityProfile.items.map((item) => (
                            <li
                                key={item.id}
                                className="flex flex-col space-y-2"
                            >
                                <div>{item.title}</div>
                                <Label>
                                    Dirección:{" "}
                                    {item.address.label.split(",")[1]}
                                </Label>
                                <ContactInfo contacts={item.contacts} />

                                <div className="flex flex-wrap gap-2">
                                    {item.categories.map((category) => (
                                        <Badge key={category.id}>
                                            {category.name}
                                        </Badge>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
