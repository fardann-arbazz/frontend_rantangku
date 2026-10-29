import { Package, Edit3, Trash2, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrice } from "@/features/seller/utils/formatter";
import type { Food } from "@/types/food-types";

const RegularProductList = ({
  products,
  // surplusProducts,
  isLoading,
  onEdit,
  // onConvert,
  onDelete,
  setSelectedProduct,
}: {
  products: Food[];
  isLoading: boolean;
  surplusProducts: Food[];
  onEdit: (product: Food) => void;
  // onConvert: (product: Food) => void;
  onDelete: (product: Food) => void;
  setSelectedProduct: (product: Food) => void;
}) => {
  console.log(isLoading);

  // ${hasSurplus ? "border-l-4 border-l-orange-400" : ""}

  return (
    <div className="space-y-2">
      {products.map((product) => {
        // const hasSurplus = surplusProducts.some(
        //   (s) => s.regularProductId === product.id,
        // );
        return (
          <Card
            key={product.id}
            className={`border-slate-200 hover:shadow-md transition-all `}
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex gap-3">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                  {product.foodsImg?.length > 0 ? (
                    <img
                      src={product.foodsImg[0].imgUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-8 w-8 text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-slate-800">
                          {product.name}
                        </h4>
                        {/* {hasSurplus && (
                          <Badge className="text-[10px] bg-orange-100 text-orange-700 border-orange-200">
                            <Flame className="h-3 w-3 mr-0.5" />
                            Flash Sale
                          </Badge>
                        )} */}
                      </div>
                      {product.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {product.description}
                        </p>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(product)}>
                          <Edit3 className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        {/* {!hasSurplus && (
                          <DropdownMenuItem onClick={() => onConvert(product)}>
                            <Flame className="h-4 w-4 mr-2 text-orange-500" />
                            Jadikan Flash Sale
                          </DropdownMenuItem>
                        )} */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedProduct(product);
                            onDelete(product);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <p className="text-sm font-bold text-primary">
                      {formatPrice(product.price)}
                    </p>
                    {/* <Badge variant="outline" className="text-[10px]">
                      {product.category}
                    </Badge> */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default RegularProductList;
