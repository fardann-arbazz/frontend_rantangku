import { Navigate, RouterProvider } from "react-router-dom";
import AuthProvider from "./providers/auth-provider";
import { router } from "./router/router";
import { Toaster } from "sonner";
import { selectIsInitialized, useAuthStore } from "./stores/auth-stores";
import { Spinner } from "./components/ui/spinner";

// ─── Root Redirect (lebih fleksibel) ─────────────────────────
export function RootRedirect() {
  return <Navigate to="/login" replace />;
}

const App = () => {
  const isInitialized = useAuthStore(selectIsInitialized);

  return (
    <AuthProvider>
      <Toaster />
      {!isInitialized ? <Spinner /> : <RouterProvider router={router} />}
    </AuthProvider>
  );
};

export default App;
