import { Package, Flame, Trash2, Package2, Timer } from "lucide-react";
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
import type { SurplusFood } from "@/types/food-types";

const SurplusProductGrid = ({
  products,
  onDelete,
}: {
  products: SurplusFood[];
  onDelete: (id: number) => void;
}) => {
  console.log("surplus", products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="border-orange-200 hover:border-orange-400 hover:shadow-md transition-all bg-linear-to-b from-orange-50/50 to-white"
        >
          <CardContent className="p-0">
            <div className="relative aspect-square bg-slate-100 rounded-t-xl overflow-hidden">
              {product.food.foodsImg && product.food.foodsImg.length > 0 ? (
                <img
                  src={product.food.foodsImg[0].imgUrl}
                  alt={product.food.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-slate-400" />
                </div>
              )}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <Badge className="bg-red-500 text-white border-0 text-xs font-bold">
                  {product.discountPrice}% OFF
                </Badge>
                <Badge className="bg-orange-500 text-white border-0 text-[10px]">
                  <Flame className="h-3 w-3 mr-0.5" />
                  Flash Sale
                </Badge>
              </div>
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">
                {product.food.name}
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-sm font-bold text-red-600">
                  {formatPrice(product.discountPrice)}
                </span>
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.food.price)}
                </span>
              </div>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Package2 className="h-3 w-3" />
                    Stok: {product.quantity}
                  </span>
                  <span className="text-red-500 flex items-center gap-1 font-medium">
                    <Timer className="h-3 w-3" />
                    {formatTimeLeft(product.expiresAt)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-red-500 to-orange-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (product.quantity / 50) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Hapus Flash Sale
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Flash Sale?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Hanya flash sale yang akan dihapus. Produk reguler "
                      {product.food.name}" tetap tersedia.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onDelete(Number(product.id))}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Hapus
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SurplusProductGrid;
