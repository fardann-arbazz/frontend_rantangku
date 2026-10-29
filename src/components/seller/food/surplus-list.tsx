import { Package, Trash2, Package2, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatPrice, formatTimeLeft } from "@/features/seller/utils/formatter";

const SurplusProductList = ({
  products,
  onDelete,
}: {
  products: any[];
  onDelete: (id: number) => void;
}) => (
  <div className="space-y-2">
    {products.map((product) => (
      <Card
        key={product.id}
        className="border-orange-200 hover:border-orange-400 transition-all bg-linear-to-r from-orange-50/50 to-white"
      >
        <CardContent className="p-3 sm:p-4">
          <div className="flex gap-3">
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
              {product.imgUrl?.length > 0 ? (
                <img
                  src={product.imgUrl[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-slate-400" />
                </div>
              )}
              <div className="absolute top-1 left-1">
                <Badge className="bg-red-500 text-white border-0 text-[10px] font-bold">
                  {product.discount}% OFF
                </Badge>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">
                    {product.name}
                  </h4>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-red-600">
                      {formatPrice(product.discountedPrice)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus Flash Sale?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Hanya flash sale yang akan dihapus. Produk reguler "
                        {product.name}" tetap tersedia.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(product.id)}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[10px]">
                <span className="text-slate-500 flex items-center gap-1">
                  <Package2 className="h-3 w-3" />
                  Stok: {product.quantity}
                </span>
                <span className="text-red-500 flex items-center gap-1 font-medium">
                  <Timer className="h-3 w-3" />
                  {formatTimeLeft(product.expiresAt)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default SurplusProductList;
