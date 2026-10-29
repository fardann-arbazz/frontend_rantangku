export type Role = "ADMIN" | "USER" | "SELLER";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: Role;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_VERIFICATION";
  emailVerifiedAt?: string;
  avatarUrl?: string;
  createdAt: string;

  sellerProfile?: {
    id: string;
    storeName: string;
    storeImageUrl?: string;
    storeDesc?: string;
  } | null;
}

// Auth API request/response shapes
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  token: string;
}

export interface AuthResponse {
  user: User;
  message?: string;
}

export interface RefreshResponse {
  user: User;
}

// Seller registration
export interface SellerRegisterPayload {
  storeName: string;
  storeDescription: string;
  phone: string;
}

// Zustand auth store shape
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean; // true after first /me check
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setInitialized: () => void;
  logout: () => void;
}
