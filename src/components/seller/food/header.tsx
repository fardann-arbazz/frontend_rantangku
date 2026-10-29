import { Search, Package, Flame, Grid3X3, List, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductHeader = ({
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  activeTab,
  setActiveTab,
  regularCount,
  surplusCount,
  onAddProduct,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: string;
  setViewMode: (mode: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  regularCount: number;
  surplusCount: number;
  onAddProduct: () => void;
}) => (
  <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
    <div className="px-4 sm:px-6 py-3">
      <div className="flex items-center gap-3 mb-3">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-800">
            Manajemen Produk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kelola produk reguler & flash sale Anda
          </p>
        </div>
      </div>

      <Card className="mb-3 bg-linear-to-r from-orange-50 to-amber-50 border-orange-200">
        <CardContent className="p-3 flex items-start gap-3">
          <div className="p-2 bg-orange-100 rounded-lg shrink-0">
            <Zap className="h-4 w-4 text-orange-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-orange-800">Fitur Flash Sale</p>
            <p className="text-xs text-orange-600 mt-0.5">
              Upload produk reguler terlebih dahulu, lalu konversi menjadi flash
              sale untuk menjual dengan diskon khusus.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Cari produk..."
            className="pl-9 bg-slate-50 border-slate-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex bg-slate-100 rounded-lg p-0.5">
            {["grid", "list"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === mode
                    ? "bg-white shadow-sm text-slate-800"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {mode === "grid" ? (
                  <Grid3X3 className="h-4 w-4" />
                ) : (
                  <List className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>
          <Button onClick={onAddProduct}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Produk
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-3">
        <TabsList>
          <TabsTrigger value="regular" className="flex items-center gap-1.5">
            <Package className="h-4 w-4" />
            Produk Reguler
            <Badge variant="secondary" className="text-[10px] h-5 px-1.5 ml-1">
              {regularCount}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="surplus" className="flex items-center gap-1.5">
            <Flame className="h-4 w-4" />
            Flash Sale
            <Badge
              variant="secondary"
              className="text-[10px] h-5 px-1.5 ml-1 bg-orange-100 text-orange-700"
            >
              {surplusCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </header>
);

export default ProductHeader;
