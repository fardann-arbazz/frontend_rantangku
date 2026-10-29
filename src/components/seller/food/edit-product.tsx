import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EditProductDialog = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    description: string;
    price: string;
  };
  setFormData: (data: any) => void;
  onSubmit: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Produk</DialogTitle>
        <DialogDescription>Perbarui informasi produk</DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Nama Produk</Label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Deskripsi</Label>
          <Textarea
            className="resize-none"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Harga</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="number"
              className="pl-9"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Batal
        </Button>
        <Button onClick={onSubmit}>Simpan</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default EditProductDialog;
