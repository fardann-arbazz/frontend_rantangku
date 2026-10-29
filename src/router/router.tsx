import { createBrowserRouter } from "react-router-dom";
import {
  PrivateRoute,
  PublicOnlyRoute,
  RoleGuard,
  SellerRegistrationGuard,
  VerifiedRoute,
} from "./guards";
import LoginPage from "@/features/auth/pages/login-page";
import RegisterPage from "@/features/auth/pages/register-page";
import VerifyEmail from "@/features/auth/pages/verify-email";
import AdminDashboardPage from "@/features/dashboard/admin-dashboard";
import UserDashboardPage from "@/features/dashboard/user-dashboard";
import SellerDashboardPage from "@/features/dashboard/seller-dashboard";
import BecomeSellerPage from "@/features/seller/become-seller-page";
import { RootRedirect } from "@/App";
import NotFoundPage from "@/features/misc/not-found-page";
import HomePage from "@/features/home/home";
import LocationPage from "@/features/user/location-page";
import FoodProducts from "@/features/seller/food-product";
import SellerLayout from "@/features/seller/layouts/seller-layout";

// ─── Route Tree ─────────────────────────────────────────────
export const router = createBrowserRouter([
  // PUBLIC
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },

  // VERIFY EMAIL
  { path: "/verify-email", element: <VerifyEmail /> },

  {
    element: <PrivateRoute />,
    children: [
      // USER GENERAL AREA
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/location",
        element: <LocationPage />,
      },

      // VERIFIED AREA
      {
        element: <VerifiedRoute />,
        children: [
          {
            element: <RoleGuard allowedRoles={["ADMIN"]} />,
            children: [
              { path: "/dashboard/admin", element: <AdminDashboardPage /> },
            ],
          },
          {
            element: <RoleGuard allowedRoles={["USER"]} />,
            children: [
              { path: "/dashboard/user", element: <UserDashboardPage /> },
            ],
          },
          {
            element: <RoleGuard allowedRoles={["SELLER"]} />,
            children: [
              // SellerLayout membungkus semua halaman seller
              {
                element: <SellerLayout />,
                children: [
                  {
                    path: "/dashboard/seller",
                    element: <SellerDashboardPage />,
                  },
                  {
                    path: "/dashboard/seller/food-products",
                    element: <FoodProducts />,
                  },
                ],
              },
            ],
          },
        ],
      },

      // SELLER FLOW (tetap butuh login tapi belum verified seller)
      {
        element: <SellerRegistrationGuard />,
        children: [{ path: "/become-seller", element: <BecomeSellerPage /> }],
      },
    ],
  },

  { path: "/", element: <RootRedirect /> },
  { path: "*", element: <NotFoundPage /> },
]);
