import { Flame, Hash, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate, formatPrice } from "@/features/seller/utils/formatter";

const ConvertSurplusDialog = ({
  open,
  onOpenChange,
  selectedProduct,
  surplusData,
  setSurplusData,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProduct: any;
  surplusData: {
    quantity: string;
    expiresAt: string;
  };
  setSurplusData: (data: any) => void;
  onSubmit: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          Jadikan Flash Sale
        </DialogTitle>
        <DialogDescription>
          Produk "{selectedProduct?.name}" akan dijual dengan diskon khusus
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        {selectedProduct && (
          <div className="flex gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="h-16 w-16 rounded-lg bg-slate-200 overflow-hidden shrink-0">
              {selectedProduct.imgUrl?.[0] && (
                <img
                  src={selectedProduct.imgUrl[0]}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <h4 className="font-medium text-sm">{selectedProduct.name}</h4>
              <p className="text-sm font-bold text-primary mt-1">
                {formatPrice(selectedProduct.price)}
              </p>
            </div>
          </div>
        )}

        <Card className="bg-linear-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Harga Diskon (50%)</p>
                <p className="text-lg font-bold text-red-600">
                  {selectedProduct
                    ? formatPrice(Math.round(selectedProduct.price * 0.5))
                    : "-"}
                </p>
              </div>
              <Badge className="bg-red-500 text-white text-sm font-bold px-3 py-1">
                50% OFF
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Quantity <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="number"
              placeholder="Jumlah stok flash sale"
              className="pl-9"
              value={surplusData.quantity}
              onChange={(e) =>
                setSurplusData({ ...surplusData, quantity: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            Tanggal Expired <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="datetime-local"
              className="pl-9"
              value={surplusData.expiresAt}
              onChange={(e) =>
                setSurplusData({ ...surplusData, expiresAt: e.target.value })
              }
            />
          </div>
        </div>

        {surplusData.quantity && surplusData.expiresAt && selectedProduct && (
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">
              Preview Card Flash Sale
            </Label>
            <Card className="border-2 border-orange-300 bg-linear-to-b from-orange-50/50 to-white">
              <CardContent className="p-3">
                <div className="flex gap-3">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden shrink-0">
                    {selectedProduct.imgUrl?.[0] && (
                      <img
                        src={selectedProduct.imgUrl[0]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                    <Badge className="absolute top-1 left-1 bg-red-500 text-white border-0 text-[10px] font-bold">
                      50% OFF
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">
                      {selectedProduct.name}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-sm font-bold text-red-600">
                        {formatPrice(Math.round(selectedProduct.price * 0.5))}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(selectedProduct.price)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px]">
                      <span className="text-slate-500">
                        Stok: {surplusData.quantity}
                      </span>
                      <span className="text-red-500 flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        Exp: {formatDate(surplusData.expiresAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Batal
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-orange-500 hover:bg-orange-600"
        >
          <Flame className="h-4 w-4 mr-2" />
          Aktifkan Flash Sale
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ConvertSurplusDialog;
