import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/auth-stores";
import { toast } from "sonner";
import { router } from "@/router/router";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }

  interface AxiosRequestConfig {
    skipAuthRefresh?: boolean;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

// ── Refresh token flow state ─────────────────────────────────
let isRefreshing = false;
let isRedirectingToLogin = false;

let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

function processQueue(error: AxiosError | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
}

// ── Request interceptor ──────────────────────────────────────
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor ─────────────────────────────────────
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    // ── 401: hanya refresh jika tidak di-skip ─────────────────
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        processQueue(null);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError);
        useAuthStore.getState().logout();

        // Cegah multiple redirect
        if (!isRedirectingToLogin) {
          isRedirectingToLogin = true;
          // Gunakan router navigate, bukan window.location.href
          // agar tidak trigger full reload → AuthProvider tidak re-run
          router.navigate("/login?reason=session_expired", { replace: true });

          // Reset flag setelah navigasi selesai
          setTimeout(() => {
            isRedirectingToLogin = false;
          }, 1000);
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ── 403: Forbidden ────────────────────────────────────────
    if (status === 403) {
      toast.error("Access denied", {
        description: "You don't have permission to perform this action.",
      });
    }

    // ── 422: Validation — biarkan form handle sendiri ─────────
    if (status === 422) {
      return Promise.reject(error);
    }

    // ── 500+: Server errors ───────────────────────────────────
    if (status && status >= 500) {
      toast.error("Server error", {
        description: "Something went wrong on our end. Please try again.",
      });
    }

    // ── Network error ─────────────────────────────────────────
    if (!error.response) {
      toast.error("Network error", {
        description: "Check your connection and try again.",
      });
    }

    return Promise.reject(error);
  },
);
