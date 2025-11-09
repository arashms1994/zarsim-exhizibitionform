import { useQuery } from "@tanstack/react-query";
import { fetchAllCities } from "@/api/getCities";

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchAllCities,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
