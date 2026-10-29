import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Bell, LogOut, Menu, Settings, Store } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { SidebarContent } from "./sidebar-content";

const MobileHeader = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) => {
    
  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Menu className="h-5 w-5 text-slate-600" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetHeader className="p-4 text-left border-b border-slate-200">
                    <SheetTitle className="text-lg font-semibold">
                      Menu
                    </SheetTitle>
                  </SheetHeader>
                  <SidebarContent setMobileMenuOpen={setMobileMenuOpen}/>
                </SheetContent>
              </Sheet>
              <div>
                <h1 className="text-lg font-semibold text-slate-800">
                  Warung Mbak Sri
                </h1>
                <p className="text-xs text-slate-500">Seller Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
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

export default MobileHeader;
