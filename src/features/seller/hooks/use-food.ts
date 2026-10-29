import { useQuery } from "@tanstack/react-query";
import { foodApi } from "../api/food-api";

export const useGetRegulerProducts = (sellerId?: string) => {
  return useQuery({
    queryKey: ["regulerProducts", sellerId],

    queryFn: async () => {
      const res = await foodApi.getRegulerProductsBySeller(sellerId!);

      return res.data.data;
    },

    // hanya jalan kalau sellerId ada
    enabled: !!sellerId,

    // Cache control (dashboard tidak perlu refetch terus)
    staleTime: 1000 * 60 * 5, // 5 menit
    gcTime: 1000 * 60 * 10, // 10 menit di memory

    // Hindari spam request
    retry: 1,

    refetchOnWindowFocus: false,
  });
};

export const useGetSurplusProducts = (sellerId?: string) => {
  return useQuery({
    queryKey: ["surplusProducts", sellerId],

    queryFn: async () => {
      const res = await foodApi.getSurplusProductsBySeller(sellerId!);

      return res.data.data;
    },

    // hanya jalan kalau sellerId ada
    enabled: !!sellerId,

    // Cache control (dashboard tidak perlu refetch terus)
    staleTime: 1000 * 60 * 5, // 5 menit
    gcTime: 1000 * 60 * 10, // 10 menit di memory

    // Hindari spam request
    retry: 1,

    refetchOnWindowFocus: false,
  });
};
