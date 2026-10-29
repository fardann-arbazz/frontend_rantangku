import { Package, Flame, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmptyState = ({
  activeTab,
  onAddProduct,
  onSwitchTab,
}: {
  activeTab: string;
  onAddProduct: () => void;
  onSwitchTab: () => void;
}) => (
  <div className="text-center py-12">
    {activeTab === "regular" ? (
      <>
        <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">
          Belum ada produk
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Tambahkan produk reguler terlebih dahulu
        </p>
        <Button onClick={onAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Produk
        </Button>
      </>
    ) : (
      <>
        <Flame className="h-16 w-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-600 mb-1">
          Belum ada flash sale
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Konversi produk reguler menjadi flash sale
        </p>
        <Button variant="outline" onClick={onSwitchTab}>
          Lihat Produk Reguler
        </Button>
      </>
    )}
  </div>
);

export default EmptyState;
