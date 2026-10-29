import { Bell, LogOut, Search, Settings, Store } from "lucide-react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { selectUser, useAuthStore } from "@/stores/auth-stores";

const DesktopHeader = () => {
  const user = useAuthStore(selectUser);

  return (
    <>
      <header className="hidden lg:block sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-slate-800">
                Selamat Datang, {user?.sellerProfile?.storeName ?? "Seller 1"}
              </h1>
              <p className="text-sm text-slate-500">
                Kelola toko dan pesanan Anda
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Cari pesanan, produk..."
                  className="pl-9 bg-slate-50 border-slate-200"
                />
              </div>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      WM
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Store className="h-4 w-4 mr-2" />
                    Toko Saya
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Pengaturan
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DesktopHeader;
