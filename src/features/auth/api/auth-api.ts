import { api } from "@/lib/axios";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  SellerRegisterPayload,
  User,
  VerifyEmailPayload,
} from "@/types/auth-types";
import type { ApiResponse } from "@/types/api-types";

export const authApi = {
  register: (payload: RegisterPayload) =>
    api.post<ApiResponse<{ message: string }>>("/auth/register", payload, {
      skipAuthRefresh: true,
    }),

  verifyEmail: (payload: VerifyEmailPayload) =>
    api.post<ApiResponse<{ message: string }>>("/auth/verify-email", payload, {
      skipAuthRefresh: true,
    }),

  resendVerification: (email: string) =>
    api.post<ApiResponse<{ message: string }>>(
      "/auth/resend-verification",
      { email },
      { skipAuthRefresh: true },
    ),

  login: (payload: LoginPayload) =>
    api.post<ApiResponse<AuthResponse>>("/auth/login", payload, {
      skipAuthRefresh: true,
    }),

  refresh: () =>
    api.post<ApiResponse<{ user: User }>>("/auth/refresh", undefined, {
      skipAuthRefresh: true, // ← refresh gagal langsung logout, jangan loop
    }),

  // getMe, logout, getSessions, dll — TIDAK pakai skipAuthRefresh
  // karena jika 401, mereka memang perlu dicoba refresh dulu
  getMe: () => api.get<ApiResponse<User>>("/auth/me"),

  logout: () => api.post<ApiResponse<{ message: string }>>("/auth/logout"),

  registerAsSeller: (payload: SellerRegisterPayload) =>
    api.post<ApiResponse<AuthResponse>>("/auth/register-seller", payload),
};
