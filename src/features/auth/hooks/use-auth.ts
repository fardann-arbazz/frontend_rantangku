import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/features/auth/api/auth-api";
import { queryKeys } from "@/lib/queryClient";
import { useAuthStore } from "@/stores/auth-stores";
import type {
  LoginPayload,
  RegisterPayload,
  SellerRegisterPayload,
} from "@/types/auth-types";
import type { AxiosError } from "axios";

// ── Bootstrap query: called once on app mount ────────────────
export function useGetMe() {
  const { setUser, setInitialized } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const res = await authApi.getMe();
      return res.data.data;
    },
    staleTime: Infinity, // only refetch explicitly
    retry: false, // 401 = not logged in, don't retry
    throwOnError: false,
    // On success: populate Zustand
    select: (user) => {
      setUser(user);
      setInitialized();
      return user;
    },
  });
}

// ── Register ─────────────────────────────────────────────────
export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (_, variables) => {
      navigate("/verify-email", { state: { email: variables.email } });
      toast.success("Account created!", {
        description: "Check your email to verify your account.",
      });
    },
  });
}

// ── Verify email ─────────────────────────────────────────────
export function useVerifyEmail() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.verifyEmail,
    onSuccess: () => {
      navigate("/login");
      toast.success("Email verified! You can now log in.");
    },
  });
}

// ── Login ─────────────────────────────────────────────────────
export function useLogin() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (res) => {
      const user = res.data.data.user;
      setUser(user);
      queryClient.setQueryData(queryKeys.auth.me(), user);

      navigate("/home");
      toast.success(`Welcome back, ${user.fullName}!`);
    },
    onError: (error: AxiosError) => {
      const apiError = error.response?.data as { message?: string };

      const message = apiError?.message || "Login gagal, coba lagi";

      toast.error(message);

      return apiError;
    },
  });
}

// ── Logout ───────────────────────────────────────────────────
export function useLogout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      logout();
      queryClient.clear();
      navigate("/login");
      toast.success("Logged out successfully.");
    },
  });
}

// ── Seller registration (USER must be logged in first) ────────
export function useRegisterAsSeller() {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: SellerRegisterPayload) =>
      authApi.registerAsSeller(payload),
    onSuccess: (res) => {
      const user = res.data.data.user;
      setUser(user);
      queryClient.setQueryData(queryKeys.auth.me(), user);
      navigate("/seller/dashboard");
      toast.success("Seller account activated!", {
        description: "Welcome to your seller dashboard.",
      });
    },
  });
}
