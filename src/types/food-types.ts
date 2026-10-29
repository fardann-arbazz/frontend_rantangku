export interface CreateFoodPayload {
  storeId: string;
  name: string;
  description: string;
  price: number;
  imgUrl?: string[];
}

export interface FoodImg {
  id: string;
  food_items_id: string;
  imgUrl: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

export interface Food {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  foodsImg: FoodImg[];
  isSurplus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SurplusFood {
  id: string;
  quantity: number;
  discountPrice: number;
  originalPrice: number;
  expiresAt: string;
  status: string;

  food: Food; // relasi
}

export type FoodResponse = {
  data: Food[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
};
