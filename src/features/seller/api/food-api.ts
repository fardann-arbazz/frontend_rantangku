import { api } from "@/lib/axios";
import type { ApiResponse, PaginatedResponse } from "@/types/api-types";
import type { CreateFoodPayload, Food } from "@/types/food-types";

export const foodApi = {
  getNearbyProducts: (lng: number, lat: number) =>
    api.post<ApiResponse<{ message: string }>>("/foods/nearby", {
      lng,
      lat,
      skipAuthRefresh: true,
    }),

  createFood: (payload: CreateFoodPayload) =>
    api.post<ApiResponse<{ message: string }>>("/foods/create", payload),

  getRegulerProductsBySeller: (sellerId: string) =>
    api.get<PaginatedResponse<Food[]>>(`/foods/store/${sellerId}/reguler`),

  getSurplusProductsBySeller: (sellerId: string) =>
    api.get<PaginatedResponse<Food[]>>(`/foods/store/${sellerId}/surplus`),
};
