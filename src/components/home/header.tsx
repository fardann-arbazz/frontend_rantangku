import { Bell, ChevronDown, MapPin, Search, ShoppingCart } from "lucide-react";
import { Input } from "../ui/input";

export const HeaderHome = () => {
  const cartCount = 3;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-slate-100">
        {/* Top Bar */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Location */}
            <div className="flex items-center gap-1.5 min-w-0">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <div className="flex items-center gap-1 min-w-0">
                <p className="text-sm font-medium truncate">Jakarta Pusat</p>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <button className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>
              <button className="relative p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <ShoppingCart className="h-5 w-5 text-slate-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Cari makanan favoritmu..."
              className="pl-9 pr-4 bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </header>
    </>
  );
};
