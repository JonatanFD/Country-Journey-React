import { COUNTRY_CODES } from "@/lib/utils";

const apiKey = import.meta.env.HERE_API_KEY as string;

async function obtenerCoordenadas(ciudad: string, pais: string) {
    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${ciudad},${pais}&apiKey=${apiKey}`;
    
    const respuesta = await fetch(url);
    const data = await respuesta.json();
    
    const coordenadas = data.items[0]?.position;
    return coordenadas;
}

async function obtenerLugares(ciudad: string, pais: string) {
    pais = COUNTRY_CODES[pais];
    
    const coordenadas = await obtenerCoordenadas(ciudad, pais);
    
    if (!coordenadas) {
        console.error('No se encontraron coordenadas para la ciudad especificada.');
        return;
    }
    
    const { lat, lng } = coordenadas;
    const url = `https://browse.search.hereapi.com/v1/browse?at=${lat},${lng}&categories=500-5200,300-3100&apiKey=${apiKey}`;
    
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        
        const lugares = data.items.map(lugar=> ({
            nombre: lugar.title,
            direccion: lugar.address.label,
            categoria: lugar.categories[0].name
        }));
        
        console.log(lugares);

        return lugares
    } catch (error) {
        console.error('Error al obtener lugares:', error);
    }
}

// Llamada de ejemplo
obtenerLugares("Lima", "PE");
