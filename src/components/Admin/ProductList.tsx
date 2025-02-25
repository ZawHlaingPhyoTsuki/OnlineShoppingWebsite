"use client";

import { CldImage } from "next-cloudinary";
import { ProductType } from "@/types/myProduct";
import { useState } from "react";
import { productApi } from "@/lib/api";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

type ProductListProps = {
  products: ProductType[];
  viewMode?: "grid" | "list";
  mutate: () => void;
};

const ProductList = ({ products, viewMode = 'grid', mutate }: ProductListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [isDeleteLoadingBtn, setIsDeleteLoadingBtn] = useState<boolean>(false)

  const handleEditStart = (product: ProductType) => {
    setEditingId(product.id);
    setEditName(product.name);
    setEditDescription(product.description);
    setEditPrice(product.price);
  };

  const handleEditSave = async (id: string) => {
    try {
      const updatedData = {
        name: editName,
        description: editDescription,
        price: editPrice,
      };
      await productApi.update(id, updatedData);
      toast.success("Product updated successfully");
      setEditingId(null);
      mutate();
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

const handleDelete = async (id: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone. This will permanently delete the product and its images.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      setIsDeleteLoadingBtn(true)
      await productApi.delete(id);
      toast.success("Product and associated images deleted successfully");
      mutate();
      setIsDeleteLoadingBtn(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product or images");
    }
  }
};

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          : "flex flex-col"
      }`}
    >
      {products?.map((product) => (
        <div
          key={product.id}
          className={`bg-white rounded-lg shadow p-4 border border-muted/50 ${
            viewMode === "list" ? "flex items-center gap-4" : ""
          }`}
        >
          {product.images && product.images.length > 0 ? (
            <CldImage
              src={product.images[0]}
              width={300}
              height={300}
              alt={product.name}
              className={`object-cover rounded-md ${
                viewMode === "grid" ? "w-full h-48" : "w-32 h-32"
              }`}
              priority={product.id === products[0]?.id}
            />
          ) : (
            <div
              className={`bg-muted/50 rounded-md ${
                viewMode === "grid" ? "w-full h-48" : "w-32 h-32"
              }`}
            ></div>
          )}
          <div className={`flex-1 ${viewMode === "list" ? "" : "mt-6"}`}>
            {editingId === product.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mb-2"
                  placeholder="Product name"
                />
                <Textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="mb-2"
                  placeholder="Product description"
                />
                <Input
                  type="number"
                  value={editPrice}
                  onChange={(e) =>
                    setEditPrice(
                      e.target.value === "" ? 0 : parseFloat(e.target.value)
                    )
                  }
                  min="0"
                  step="0.01"
                  className="mb-2"
                  placeholder="Product price"
                />
              </>
            ) : (
              <>
                <div className="flex justify-between mb-8">
                  <div>
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-[250px] md:max-w-[180px]">
                      {product.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">
                      ${product.price}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Category: {product.category?.name || "No Category"}
                    </p>
                  </div>
                </div>
              </>
            )}
            <div
              className={`mt-2 flex gap-2 ${
                viewMode === "grid" ? "justify-between" : "justify-end"
              }`}
            >
              {editingId === product.id ? (
                <>
                  <Button size="sm" onClick={() => handleEditSave(product.id)}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    onClick={() => handleEditStart(product)}
                    className="bg-blue-500 hover:bg-blue-600 text-gray-7"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    disabled={isDeleteLoadingBtn}
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(product.id)}
                  >
                    {isDeleteLoadingBtn ? (
                      "..."
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
