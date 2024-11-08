import { PixabayData } from "./pixabayTypes";

export async function getCityImage(ciudad: string, pais: string) {
    const apiKey =  import.meta.env.VITE_PIXABAY_API_KEY as string;
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(ciudad + " " + pais)}&image_type=photo`;

    try {
        const response = await fetch(url);
        const data = await response.json() as PixabayData;
        if (data.hits.length > 0) {
            // Muestra las primeras 3 imágenes encontradas (por ejemplo)
            const imagenes = data.hits.slice(0, 3).map((imagen)=> ({
                url: imagen.webformatURL,
                descripcion: imagen.tags
            }));

            return imagenes ;
        } else {
            console.log("No se encontraron imágenes para esta ciudad.");
            return []
        }
    } catch (error) {
        console.error("Error al obtener imágenes:", error);
        return []
    }
}