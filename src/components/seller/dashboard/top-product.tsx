import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { ArrowDown, ArrowUp, ChevronRight } from "lucide-react";

const TopProduct = () => {
  const topProducts = [
    {
      id: 1,
      name: "Ayam Geprek Premium",
      sold: 234,
      revenue: 3510000,
      growth: 15,
    },
    {
      id: 2,
      name: "Nasi Goreng Spesial",
      sold: 189,
      revenue: 2835000,
      growth: 8,
    },
    {
      id: 3,
      name: "Paket Hemat Keluarga",
      sold: 156,
      revenue: 6240000,
      growth: -3,
    },
    {
      id: 4,
      name: "Es Teh Manis Jumbo",
      sold: 345,
      revenue: 1725000,
      growth: 22,
    },
  ];

  return (
    <>
      <Card className="border-slate-200">
        <CardHeader className="p-4 sm:p-5 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Produk Terlaris
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Lihat Semua
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="space-y-3">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src="/api/placeholder/40/40"
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {product.sold} terjual
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-semibold text-slate-800">
                    {formatPrice(product.revenue)}
                  </p>
                  <div className="flex items-center justify-end gap-1">
                    {product.growth > 0 ? (
                      <ArrowUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        product.growth > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {Math.abs(product.growth)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default TopProduct;
