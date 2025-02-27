"use client";

import { CldImage } from "next-cloudinary";
import React, { useState, useCallback } from "react";
import { productApi } from "@/lib/api";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Product } from "@/types/product";

type ProductListProps = {
  products: Product[];
  viewMode?: "grid" | "list";
  mutate: () => void;
};

// Memoized ProductCard to prevent unnecessary re-renders
const ProductCard = React.memo(
  ({
    product,
    viewMode,
    editingId,
    editData,
    setEditData,
    setEditingId, // Added to reset editingId
    handleEditStart,
    handleEditSave,
    handleDelete,
    isDeleteLoading,
  }: {
    product: Product;
    viewMode: "grid" | "list";
    editingId: string | null;
    editData: Partial<Product>;
    setEditData: (data: Partial<Product>) => void;
    setEditingId: (id: string | null) => void; // Added to props
    handleEditStart: (product: Product) => void;
    handleEditSave: (id: string) => void;
    handleDelete: (id: string) => void;
    isDeleteLoading: boolean;
  }) => {
    const isEditing = editingId === product.id;

    return (
      <div
        className={`bg-white rounded-lg shadow p-4 border border-muted/50 ${
          viewMode === "list" ? "flex items-center gap-4" : ""
        }`}
      >
        {product.images?.length > 0 ? (
          <CldImage
            src={product.images[0]}
            width={300}
            height={300}
            alt={product.name}
            className={`object-cover rounded-md ${
              viewMode === "grid" ? "w-full h-64" : "w-32 h-32"
            }`}
            priority={false}
          />
        ) : (
          <div
            className={`bg-muted/50 rounded-md ${
              viewMode === "grid" ? "w-full h-48" : "w-32 h-32"
            }`}
          />
        )}
        <div className={`flex-1 ${viewMode === "list" ? "" : "mt-6"}`}>
          {isEditing ? (
            <>
              <Input
                value={editData.name ?? ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="mb-2"
                placeholder="Product name"
              />
              <Textarea
                value={editData.description ?? ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="mb-2"
                placeholder="Product description"
              />
              <Input
                type="number"
                value={editData.price ?? 0}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                className="mb-2"
                placeholder="Product price"
              />
              <Input
                type="number"
                value={editData.discountedPrice ?? 0}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    discountedPrice:
                      e.target.value === "" ? 0 : parseFloat(e.target.value),
                  })
                }
                min="0"
                step="0.01"
                className="mb-2"
                placeholder="Product discounted price"
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
                  <div className="flex gap-2 justify-end items-baseline">
                    <span className="text-lg font-bold text-primary">
                      ${product.discountedPrice}
                    </span>
                    <span className="text-md text-meta-4 line-through">
                      ${product.price}
                    </span>
                  </div>
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
            {isEditing ? (
              <>
                <Button size="sm" onClick={() => handleEditSave(product.id)}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditData({}); // Clear edit data
                    setEditingId(null); // Exit edit mode
                  }}
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
                  disabled={isDeleteLoading}
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  {isDeleteLoading ? "..." : <Trash2 className="w-5 h-5" />}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

const ProductList = ({
  products,
  viewMode = "grid",
  mutate,
}: ProductListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleEditStart = useCallback((product: Product) => {
    setEditingId(product.id);
    setEditData({
      name: product.name,
      description: product.description,
      price: product.price,
      discountedPrice: product.discountedPrice,
    });
  }, []);

  const handleEditSave = useCallback(
    async (id: string) => {
      try {
        await productApi.update(id, editData);
        toast.success("Product updated successfully");
        setEditingId(null);
        setEditData({});
        mutate();
      } catch (error) {
        toast.error("Failed to update product");
      }
    },
    [editData, mutate]
  );

  const handleDelete = useCallback(
    async (id: string) => {
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
          setIsDeleteLoading(true);
          await productApi.delete(id);
          toast.success("Product and associated images deleted successfully");
          mutate();
        } catch (error) {
          console.error("Error deleting product:", error);
          toast.error("Failed to delete product or images");
        } finally {
          setIsDeleteLoading(false);
        }
      }
    },
    [mutate]
  );

  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
          : "flex flex-col"
      }`}
    >
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          viewMode={viewMode}
          editingId={editingId}
          editData={editData}
          setEditData={setEditData}
          setEditingId={setEditingId} // Pass setEditingId to ProductCard
          handleEditStart={handleEditStart}
          handleEditSave={handleEditSave}
          handleDelete={handleDelete}
          isDeleteLoading={isDeleteLoading}
        />
      ))}
    </div>
  );
};

export default ProductList;
