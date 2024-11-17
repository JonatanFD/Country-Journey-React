import { City, GraphFilteredData, JourneyConstrains, Route } from "../types";

const API_URL = import.meta.env.VITE_FLASK_API_URL;

export async function getCities() {
  try {
    const data = await fetch(API_URL + "cities");
    const countries = await data.json() as City[];

    return countries;
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function getRoutes() {
  try {
    const data = await fetch(API_URL + "routes");
    const routes = await data.json() as Route[];

    return routes;
  } catch (error) {
    console.log(error);
    return []
  }
}

export async function getJourney(journeyConstrains: JourneyConstrains) {
  try {
    const data = await fetch(API_URL + "journey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(journeyConstrains),
    });
    
    const journey = await data.json();
    return journey;
  } catch (error) {
    console.log(error);
  }
}


export async function getGraphByFilter(filters: string[]): Promise<GraphFilteredData> {
  const endpoint = API_URL + `cities/filter?country=${filters.join(",")}`;

  try {
    const data = await fetch(endpoint);
    const graph = await data.json() as GraphFilteredData;
    return graph;
  } catch (error) {
    console.log(error);
    return {cities: [], routes: []}
  }
}