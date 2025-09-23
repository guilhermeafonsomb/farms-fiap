import { useQuery } from "@tanstack/react-query";
import { fetchProductsByPeriod } from "../services/produtos";

type Period = "Semanal" | "Mensal" | "Anual";

export const useProductsByPeriod = (period: Period) => {
  return useQuery({
    queryKey: ["products", period],
    queryFn: () => fetchProductsByPeriod(period!),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // cache 5min
  });
};
