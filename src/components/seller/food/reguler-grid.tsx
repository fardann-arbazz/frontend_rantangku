import { Package, Edit3, Trash2, ImagePlus, Flame } from "lucide-react";
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
import { formatPrice } from "@/features/seller/utils/formatter";
import type { Food, SurplusFood } from "@/types/food-types";

const RegularProductGrid = ({
  products,
  surplusProducts,
  onEdit,
  onConvert,
  onDelete,
  selectedProduct,
  setSelectedProduct,
}: {
  products: Food[];
  surplusProducts: SurplusFood[];
  onEdit: (product: Food) => void;
  onConvert: (product: Food) => void;
  onDelete: () => void;
  selectedProduct: Food | null;
  setSelectedProduct: (product: Food | null) => void;
}) => {
  console.log("products", products);

  //  ${hasSurplus ? "border-l-4 border-l-orange-400" : ""}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products?.map((product) => {
        const hasSurplus = (surplusProducts ?? []).some(
          (s) => s.food.id === product.id,
        );
        console.log("has surplus", hasSurplus);

        return (
          <Card
            key={product.id}
            className={`border-slate-200 hover:shadow-md transition-all group  pt-0`}
          >
            <CardContent className="p-0">
              <div className="relative aspect-square bg-slate-100 rounded-t-xl overflow-hidden">
                {product.foodsImg?.length > 0 ? (
                  <img
                    src={product.foodsImg[0].imgUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-12 w-12 text-slate-400" />
                  </div>
                )}

                {hasSurplus && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500 text-white border-0 text-[10px]">
                      <Flame className="h-3 w-3 mr-0.5" />
                      Sedang Flash Sale
                    </Badge>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8"
                    onClick={() => onEdit(product)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  {!hasSurplus && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="h-8 w-8 bg-orange-500 hover:bg-orange-600"
                      onClick={() => onConvert(product)}
                    >
                      <Flame className="h-4 w-4 text-white" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Apakah Anda yakin ingin menghapus "
                          {selectedProduct?.name}"?
                          {surplusProducts.some(
                            (s) => s.food.id === selectedProduct?.id,
                          ) && " Flash sale terkait juga akan dihapus."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={onDelete}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Hapus
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {product.foodsImg?.length > 1 && (
                  <Badge className="absolute bottom-2 right-2 bg-black/60 text-white border-0 text-[10px]">
                    <ImagePlus className="h-3 w-3 mr-0.5" />
                    {product.foodsImg.length}
                  </Badge>
                )}
              </div>

              <div className="p-3">
                <h3 className="font-semibold text-sm text-slate-800 line-clamp-1">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {product.description}
                  </p>
                )}
                <div className="flex items-end justify-between mt-2">
                  <p className="text-sm font-bold text-primary">
                    {formatPrice(product.price)}
                  </p>
                  {/* <Badge variant="outline" className="text-[10px]">
                  {product.category}
                </Badge> */}
                </div>
                {!hasSurplus && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-orange-600 border-orange-300 hover:bg-orange-50 text-xs"
                    onClick={() => onConvert(product)}
                  >
                    <Flame className="h-3 w-3 mr-1" />
                    Jadikan Flash Sale
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RegularProductGrid;
