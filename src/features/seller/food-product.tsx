import ConvertSurplusDialog from "@/components/seller/food/convert-surplus";
import CreateProductDialog from "@/components/seller/food/create-product";
import EditProductDialog from "@/components/seller/food/edit-product";
import EmptyState from "@/components/seller/food/empty-state";
import ProductHeader from "@/components/seller/food/header";
import RegularProductGrid from "@/components/seller/food/reguler-grid";
import RegularProductList from "@/components/seller/food/reguler-list";
import SurplusProductGrid from "@/components/seller/food/surplus-grid";
import SurplusProductList from "@/components/seller/food/surplus-list";
import { useAuthStore } from "@/stores/auth-stores";
import { useState } from "react";
import { useGetRegulerProducts, useGetSurplusProducts } from "./hooks/use-food";

const FoodProducts = () => {
  const [activeTab, setActiveTab] = useState("regular");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showSurplusDialog, setShowSurplusDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const user = useAuthStore((s) => s.user);
  const sellerId = user?.sellerProfile?.id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl: [],
  });
  const [surplusData, setSurplusData] = useState({
    quantity: "",
    expiresAt: "",
  });

  const { data, isLoading } = useGetRegulerProducts(sellerId);
  const { data: surplusFood } = useGetSurplusProducts(sellerId);

  const [regularProducts, setRegularProducts] = useState([]);

  const [surplusProducts, setSurplusProducts] = useState([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImages([]);
    setImagePreviews([]);

    setFormData({
      name: "",
      description: "",
      price: "",
    });
  };

  const handleCreateProduct = () => {
    const newProduct = {
      id: String(Date.now()),
      ...formData,
      price: Number(formData.price),
      images, // nanti untuk upload backend
    };

    console.log("PRODUCT:", newProduct);

    setShowCreateDialog(false);
    resetForm();
  };

  const handleEditProduct = () => {
    setRegularProducts(data);
    setShowEditDialog(false);
    resetForm();
  };

  const handleDeleteProduct = (product: { id: string }) => {
    setRegularProducts(regularProducts.filter((p) => p.id !== product.id));
    setSurplusProducts(
      surplusProducts.filter((p) => p.regularProductId !== product.id),
    );
  };

  const handleConvertToSurplus = () => {
    setSurplusProducts([
      {
        id: `s${Date.now()}`,
        regularProductId: selectedProduct.id,
        ...selectedProduct,
        discountedPrice: Math.round(selectedProduct.price * 0.5),
        discount: 50,
        quantity: parseInt(surplusData.quantity),
        expiresAt: surplusData.expiresAt,
        status: "active",
        createdAt: new Date().toISOString(),
      },
      ...surplusProducts,
    ]);
    setShowSurplusDialog(false);
    setSurplusData({ quantity: "", expiresAt: "" });
    setSelectedProduct(null);
  };

  const openEditDialog = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      imgUrl: product.imgUrl || [],
    });
    setShowEditDialog(true);
  };

  const openSurplusDialog = (product) => {
    if (surplusProducts.find((p) => p.regularProductId === product.id)) {
      alert("Produk ini sudah memiliki surplus aktif");
      return;
    }
    setSelectedProduct(product);
    setSurplusData({ quantity: "", expiresAt: "" });
    setShowSurplusDialog(true);
  };
  const regularProps = {
    products: data,
    isLoading: isLoading,
    surplusProducts: surplusFood,
    onEdit: openEditDialog,
    onConvert: openSurplusDialog,
    onDelete: handleDeleteProduct,
    selectedProduct,
    setSelectedProduct,
  };

  const surplusProps = {
    products: surplusFood,
    onDelete: (id: string) =>
      setSurplusProducts(surplusProducts.filter((p) => p.id !== id)),
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <ProductHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        regularCount={regularProducts.length}
        surplusCount={surplusProducts.length}
        onAddProduct={() => {
          resetForm();
          setShowCreateDialog(true);
        }}
      />

      <div className="p-4 sm:p-6">
        {activeTab === "regular" ? (
          viewMode === "grid" ? (
            <RegularProductGrid {...regularProps} />
          ) : (
            <RegularProductList {...regularProps} />
          )
        ) : viewMode === "grid" ? (
          <SurplusProductGrid {...surplusProps} />
        ) : (
          <SurplusProductList {...surplusProps} />
        )}

        {data?.length === 0 && (
          <EmptyState
            activeTab={activeTab}
            onAddProduct={() => {
              resetForm();
              setShowCreateDialog(true);
            }}
            onSwitchTab={() => setActiveTab("regular")}
          />
        )}
      </div>

      <CreateProductDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        formData={formData}
        setFormData={setFormData}
        imagePreviews={imagePreviews}
        onImageUpload={handleImageUpload}
        onRemoveImage={removeImage}
        onSubmit={handleCreateProduct}
      />
      <EditProductDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEditProduct}
      />
      <ConvertSurplusDialog
        open={showSurplusDialog}
        onOpenChange={setShowSurplusDialog}
        selectedProduct={selectedProduct}
        surplusData={surplusData}
        setSurplusData={setSurplusData}
        onSubmit={handleConvertToSurplus}
      />
    </div>
  );
};

export default FoodProducts;
