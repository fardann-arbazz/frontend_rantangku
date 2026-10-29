import {
  BarChart3,
  ClipboardList,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Package,
  Settings,
  Star,
  Store,
  Users,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import { selectUser, useAuthStore } from "@/stores/auth-stores";

export const SidebarContent = ({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
}) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const user = useAuthStore(selectUser);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/dashboard/seller",
    },
    { id: "orders", label: "Pesanan", icon: ClipboardList, badge: 23 },
    {
      id: "products",
      label: "Produk",
      icon: Package,
      link: "/dashboard/seller/food-products",
    },
    { id: "promotions", label: "Promosi", icon: Megaphone },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
    { id: "finance", label: "Keuangan", icon: Wallet },
    { id: "customers", label: "Pelanggan", icon: Users },
    { id: "settings", label: "Pengaturan", icon: Settings },
    { id: "help", label: "Bantuan", icon: HelpCircle },
    { id: "logout", label: "Keluar", icon: LogOut },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Store Info */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-800 truncate">
              {user?.sellerProfile?.storeName ?? "Seller 1"}
            </p>
            <p className="text-xs text-slate-500">Premium Seller</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          <span className="font-medium text-slate-700">4.8</span>
          <span>(567 reviews)</span>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              to={item.link ?? "/dashboard/seller"}
              key={item.id}
              onClick={() => {
                setActiveMenu(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeMenu === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge className="text-[10px] h-5 px-1.5 bg-red-500 text-white border-0">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors">
          <HelpCircle className="h-4 w-4" />
          Bantuan
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </div>
  );
};
