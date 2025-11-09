import { BASE_URL, CITIES_LIST_GUID } from "./base";
import type { ICitiesApiItem, ISharePointResponse } from "@/types/type";

export async function fetchAllCities(): Promise<ICitiesApiItem[]> {
  const allCities: ICitiesApiItem[] = [];
  let nextUrl:
    | string
    | undefined = `${BASE_URL}/_api/web/lists(guid'${CITIES_LIST_GUID}')/items?$select=Title&$top=5000`;

  while (nextUrl) {
    const response = await fetch(nextUrl, {
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "same-origin",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }

    const data: ISharePointResponse = await response.json();
    const items = data.d.results;

    const cities = items
      .map((item) => ({
        Title: item.Title || "",
      }))
      .filter((city) => city.Title);

    allCities.push(...cities);

    nextUrl = data.d.__next;
  }

  // حذف شهرهای تکراری - فقط یک نمونه از هر شهر
  const uniqueCities = Array.from(
    new Map(allCities.map((city) => [city.Title, city])).values()
  );

  return uniqueCities;
}
