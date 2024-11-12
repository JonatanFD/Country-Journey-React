import { COUNTRY_CODES } from "@/lib/utils";
import { HereAPIDATA } from "./hereTypes";

const apiKey = import.meta.env.VITE_HERE_API_KEY as string;

async function obtenerCoordenadas(ciudad: string, pais: string) {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${ciudad},${pais}&apiKey=${apiKey}`;

    const respuesta = await fetch(url);
    const data = await respuesta.json();

    const coordenadas = data.items[0]?.position;
    return coordenadas;
}

export async function getCityProfile(ciudad: string, pais: string) {
    pais = COUNTRY_CODES[pais];

    const coordenadas = await obtenerCoordenadas(ciudad, pais);

    if (!coordenadas) {
        console.error(
            "No se encontraron coordenadas para la ciudad especificada."
        );
        return { items: [] } as HereAPIDATA;
    }

    const { lat, lng } = coordenadas;
    const url = `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&categories=300-3100,500-5000,700-7000,600-6200,600-6400&apiKey=${apiKey}`;

    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();

        return data as HereAPIDATA;
    } catch (error) {
        console.error("Error al obtener lugares:", error);
        return { items: [] } as HereAPIDATA;
    }
}
