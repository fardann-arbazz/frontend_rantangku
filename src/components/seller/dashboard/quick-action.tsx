import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Megaphone, Plus, Truck } from "lucide-react";

const QuickAction = () => {
  return (
    <>
      <Card className="border-slate-200">
        <CardHeader className="p-4 sm:p-5 pb-0">
          <CardTitle className="text-base font-semibold">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <Plus className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium">Tambah Produk</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <Megaphone className="h-5 w-5 text-orange-500" />
              <span className="text-xs font-medium">Buat Promosi</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <Truck className="h-5 w-5 text-blue-500" />
              <span className="text-xs font-medium">Atur Pengiriman</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-slate-200 hover:border-primary/30 hover:bg-primary/5"
            >
              <BarChart3 className="h-5 w-5 text-green-500" />
              <span className="text-xs font-medium">Lihat Laporan</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default QuickAction;
