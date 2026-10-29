import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-stores";
import { authApi } from "@/features/auth/api/auth-api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const setInitialized = useAuthStore((s) => s.setInitialized);
  const isInitialized = useAuthStore((s) => s.isInitialized);

  useEffect(() => {
    if (isInitialized) return;

    const init = async () => {
      try {
        const res = await authApi.getMe();
        setUser(res.data.data);
      } catch {
        setUser(null);
      } finally {
        setInitialized();
      }
    };

    init();
  }, [isInitialized, setUser, setInitialized]);

  return <>{children}</>;
}
