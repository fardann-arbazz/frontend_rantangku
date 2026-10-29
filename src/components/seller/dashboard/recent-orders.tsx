import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { ChevronRight } from "lucide-react";
import { getStatusBadge } from "./status-badge";

const RecentOrders = () => {
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Budi Santoso",
      items: ["Ayam Geprek", "Es Teh Manis"],
      total: 45000,
      status: "pending",
      time: "5 menit lalu",
    },
    {
      id: "ORD-002",
      customer: "Siti Nurhaliza",
      items: ["Nasi Goreng Spesial", "Es Jeruk"],
      total: 38000,
      status: "processing",
      time: "10 menit lalu",
    },
    {
      id: "ORD-003",
      customer: "Ahmad Dahlan",
      items: ["Paket Hemat 2", "Air Mineral"],
      total: 55000,
      status: "delivered",
      time: "25 menit lalu",
    },
    {
      id: "ORD-004",
      customer: "Dewi Lestari",
      items: ["Mie Ayam Bakso", "Teh Hangat"],
      total: 32000,
      status: "cancelled",
      time: "1 jam lalu",
    },
  ];

  return (
    <>
      <Card className="border-slate-200">
        <CardHeader className="p-4 sm:p-5 pb-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              Pesanan Terbaru
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-primary">
              Lihat Semua
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="space-y-3">
            {recentOrders.map((order) => {
              const status = getStatusBadge(order.status);
              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-lg ${status.className}`}>
                      <status.icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {order.customer}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {order.items.join(", ")}
                      </p>
                      <p className="text-[10px] text-slate-400">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {formatPrice(order.total)}
                    </p>
                    <Badge className={`text-[10px] mt-1 ${status.className}`}>
                      {status.label}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default RecentOrders;
