import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import {
  ArrowUp,
  ClipboardList,
  DollarSign,
  Package,
  Star,
} from "lucide-react";

const QuickStats = () => {
  // Mock data
  const storeStats = {
    totalProducts: 156,
    activeProducts: 142,
    totalOrders: 1234,
    pendingOrders: 23,
    totalRevenue: 45600000,
    monthlyRevenue: 8900000,
    revenueGrowth: 12.5,
    averageRating: 4.8,
    totalReviews: 567,
    activeCustomers: 890,
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">Pendapatan Bulan Ini</p>
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {formatPrice(storeStats.monthlyRevenue)}
                </p>
                <div className="flex items-center gap-1 text-xs">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">
                    {storeStats.revenueGrowth}%
                  </span>
                  <span className="text-slate-400">vs bulan lalu</span>
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">Total Pesanan</p>
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {storeStats.totalOrders.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  <span className="text-amber-600 font-medium">
                    {storeStats.pendingOrders}
                  </span>{" "}
                  menunggu
                </p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <ClipboardList className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">Produk Aktif</p>
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {storeStats.activeProducts}
                </p>
                <p className="text-xs text-slate-400">
                  dari {storeStats.totalProducts} total
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-xs text-slate-500">Rating Toko</p>
                <div className="flex items-baseline gap-1">
                  <p className="text-lg sm:text-xl font-bold text-slate-800">
                    {storeStats.averageRating}
                  </p>
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-xs text-slate-400">
                  {storeStats.totalReviews} ulasan
                </p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default QuickStats;
