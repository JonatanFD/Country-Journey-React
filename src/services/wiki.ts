export async function getCityDescription(ciudad: string) {
    const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        ciudad
    )}`;

    const data = await fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al obtener información de Wikipedia");
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => error);

    return data;
}
