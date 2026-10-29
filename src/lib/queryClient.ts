import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't retry on 401/403/404 — these are not transient
      retry: (failureCount, error: unknown) => {
        const status = (error as { response?: { status: number } })?.response
          ?.status;
        if (status === 401 || status === 403 || status === 404) return false;
        return failureCount < 2;
      },
      // Stale after 30s; background refetch on focus/reconnect
      staleTime: 30_000,
      gcTime: 5 * 60 * 1000, // 5 minutes garbage collect
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
});

// ── Query key factory (type-safe keys) ──────────────────────
export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  users: {
    all: () => ["users"] as const,
    list: (filters?: object) => ["users", "list", filters] as const,
    detail: (id: string) => ["users", id] as const,
  },
  seller: {
    profile: () => ["seller", "profile"] as const,
    products: (page = 1) => ["seller", "products", page] as const,
  },
  admin: {
    stats: () => ["admin", "stats"] as const,
    users: (page = 1) => ["admin", "users", page] as const,
  },
} as const;
