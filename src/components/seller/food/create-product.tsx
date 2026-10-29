import { Package, Plus, ImagePlus, X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { formatPrice } from "@/features/seller/utils/formatter";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  formData: {
    name: string;
    description: string;
    price: string;
  };

  setFormData: (data: any) => void;

  imagePreviews: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;

  onSubmit: () => void;
};

const CreateProductDialog = ({
  open,
  onOpenChange,
  formData,
  setFormData,
  imagePreviews,
  onImageUpload,
  onRemoveImage,
  onSubmit,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Tambah Produk Baru
          </DialogTitle>
          <DialogDescription>Upload foto dan isi data produk</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* IMAGE UPLOAD */}
          <div className="space-y-2">
            <Label>Foto Produk</Label>

            <div className="grid grid-cols-4 gap-2">
              {imagePreviews.map((url, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden bg-slate-100 group"
                >
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover"
                  />

                  <button
                    onClick={() => onRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="h-3 w-3" />
                  </button>

                  {index === 0 && (
                    <Badge className="absolute bottom-1 left-1 text-[10px] bg-primary text-white">
                      Thumbnail
                    </Badge>
                  )}
                </div>
              ))}

              {imagePreviews.length < 8 && (
                <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50">
                  <ImagePlus className="h-6 w-6 text-slate-400" />
                  <span className="text-xs text-slate-400 mt-1">
                    {imagePreviews.length}/8
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* NAME */}
          <div className="space-y-2">
            <Label>Nama Produk</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* DESC */}
          <div className="space-y-2">
            <Label>Deskripsi</Label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* PRICE */}
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

          {/* PREVIEW CARD */}
          {formData.name && (
            <Card>
              <CardContent className="p-3 flex gap-3">
                <div className="h-20 w-20 bg-slate-100 rounded-lg overflow-hidden">
                  {imagePreviews.length > 0 ? (
                    <img
                      src={imagePreviews[0]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="h-8 w-8 m-auto text-slate-400" />
                  )}
                </div>

                <div>
                  <h4 className="font-semibold">{formData.name}</h4>
                  {formData.price && (
                    <p className="text-primary font-bold">
                      {formatPrice(Number(formData.price))}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={onSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
