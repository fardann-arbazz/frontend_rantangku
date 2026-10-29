import { useAuthStore } from "@/stores/auth-stores";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import type { Role } from "@/types/auth-types";
import { Spinner } from "@/components/ui/spinner";

// ─── Private Route ─────────────────────────────
export function PrivateRoute() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// ─── Email Verification Guard ─────────────────
export function VerifiedRoute() {
  const { user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  if (user?.status === "PENDING_VERIFICATION") {
    return (
      <Navigate
        to="/verify-email"
        state={{ from: location, email: user?.email }}
        replace
      />
    );
  }

  return <Outlet />;
}

// ─── Role Guard ──────────────────────────────
interface RoleGuardProps {
  allowedRoles: Role[];
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isLoading } = useAuthStore();

  if (isLoading) return <Spinner />;

  if (!user || !allowedRoles.includes(user.role)) {
    const fallbackRoutes: Record<Role, string> = {
      ADMIN: "/dashboard/admin",
      USER: "/home",
      SELLER: "/dashboard/seller",
    };

    const fallback = user ? fallbackRoutes[user.role] : "/login";
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}

// ─── Public Only Route ───────────────────────
export function PublicOnlyRoute() {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (isLoading) return <Spinner />;

  if (isAuthenticated && user) {
    const roleRoutes: Record<Role, string> = {
      ADMIN: "/dashboard/admin",
      USER: "/dashboard/user",
      SELLER: "/dashboard/seller",
    };

    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  return <Outlet />;
}

// ─── Seller Registration Guard ───────────────
export function SellerRegistrationGuard() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return <Spinner />;

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/become-seller" replace />;
  }

  if (user?.role !== "USER") {
    return <Navigate to={`/dashboard/${user?.role.toLowerCase()}`} replace />;
  }

  return <Outlet />;
}
