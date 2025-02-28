"use client";

import apiClient from "@/lib/axios";
import useSWR from "swr";
import React, { useState, useCallback } from "react";
import ViewModeBtn from "./ViewModeBtn";
import { categoryApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PreLoader from "../Common/PreLoader";
import Swal from "sweetalert2";
import { Category } from "@/types/category";
import { CldImage } from "next-cloudinary";
import SkeletonProduct from "../Common/SkeletonProduct";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);


// Memoized CategoryCard to prevent unnecessary re-renders
const CategoryCard = React.memo(
  ({
    category,
    viewMode,
    editingId,
    editData,
    setEditData,
    setEditingId,
    handleEditStart,
    handleEditSave,
    handleDelete,
    isDeleteLoading,
  }: {
    category: Category;
    viewMode: "grid" | "list";
    editingId: string | null;
    editData: Partial<Category>;
    setEditData: (data: Partial<Category>) => void;
    setEditingId: (id: string | null) => void;
    handleEditStart: (category: Category) => void;
    handleEditSave: (id: string) => void;
    handleDelete: (id: string) => void;
    isDeleteLoading: boolean;
  }) => {
    const isEditing = editingId === category.id;

    return (
      <div
        className={`bg-white rounded-lg shadow p-4 pb-6 border border-muted/50 ${
          viewMode === "list" ? "flex items-center gap-4" : ""
        }`}
      >
        {category.image ? (
          <CldImage
            src={category.image}
            width={viewMode === "grid" ? 300 : 100}
            height={viewMode === "grid" ? 300 : 100}
            alt={category.name}
            className={`object-cover rounded-md ${
              viewMode === "grid" ? "w-full h-48" : "w-32 h-32"
            }`}
            loading="lazy" // Lazy load images for better performance
          />
        ) : (
          <div
            className={`bg-muted/50 rounded-md ${
              viewMode === "grid" ? "w-full h-48" : "w-32 h-32"
            }`}
          />
        )}
        <div className={`flex-1 ${viewMode === "list" ? "" : "mt-4"}`}>
          {isEditing ? (
            <>
              <Input
                value={editData.name ?? ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="mb-2"
                placeholder="Category name"
              />
              <Textarea
                value={editData.description ?? ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                className="mb-2"
                placeholder="Category description"
              />
            </>
          ) : (
            <>
              <div className="flex justify-between mb-8">
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 max-w-[250px] md:max-w-[180px]">
                    {category.description || "No description available"}
                  </p>
                </div>
                <p
                  className={`text-sm text-muted-foreground mt-1 ${
                    category.products?.length > 0
                      ? "text-green-light"
                      : "text-red-light"
                  }`}
                >
                  Stock ({category.products?.length || 0})
                </p>
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
                <Button size="sm" onClick={() => handleEditSave(category.id)}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditData({});
                    setEditingId(null);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  onClick={() => handleEditStart(category)}
                  className="bg-blue-500 hover:bg-blue-600 text-gray-7"
                >
                  <Pencil className="w-5 h-5" />
                </Button>
                <Button
                  disabled={isDeleteLoading}
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);
CategoryCard.displayName = "CategoryCard"; // Add this line

type CategoryListProps = {
  categories: Category[];
  viewMode: "grid" | "list";
  mutate: () => void;
};

const CategoryList = ({ categories, viewMode, mutate }: CategoryListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Category>>({});
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

  const handleEditStart = useCallback((category: Category) => {
    setEditingId(category.id);
    setEditData({
      name: category.name,
      description: category.description || "",
    });
  }, []);

  const handleEditSave = useCallback(
    async (id: string) => {
      try {
        await categoryApi.update(id, editData);
        toast.success("Category updated successfully");
        setEditingId(null);
        setEditData({});
        mutate();
      } catch (error) {
        toast.error("Failed to update category");
      }
    },
    [editData, mutate]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone. This will permanently delete the category and its images.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          setIsDeleteLoading(true);
          await categoryApi.delete(id);
          toast.success("Category deleted successfully");
          mutate();
        } catch (error) {
          toast.error("Failed to delete category");
        } finally {
          setIsDeleteLoading(false);
        }
      }
    },
    [mutate]
  );

  return (
    <div
      className={`grid gap-5 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col"
      }`}
    >
      {categories?.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          viewMode={viewMode}
          editingId={editingId}
          editData={editData}
          setEditData={setEditData}
          setEditingId={setEditingId}
          handleEditStart={handleEditStart}
          handleEditSave={handleEditSave}
          handleDelete={handleDelete}
          isDeleteLoading={isDeleteLoading}
        />
      ))}
    </div>
  );
};

const CategoryView = () => {
  const { data, error, isLoading, mutate } = useSWR("/categories", fetcher);
  const categories = data as Category[];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"stock-low" | "stock-high" | "default">(
    "default"
  );

  const sortCategories = useCallback(
    (categories: Category[]) => {
      return [...(categories || [])].sort((a, b) => {
        const aStock = a.products?.length || 0;
        const bStock = b.products?.length || 0;

        if (sortBy === "default") return 0;
        return sortBy === "stock-low" ? aStock - bStock : bStock - aStock;
      });
    },
    [sortBy]
  );

  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  const sortedCategories = sortCategories(categories);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "stock-low" | "stock-high" | "default")
          }
        >
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="stock-low">Stock: Low to High</SelectItem>
            <SelectItem value="stock-high">Stock: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <ViewModeBtn viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {isLoading ? (
        <SkeletonProduct productStyle={viewMode} limit={10} />
      ) : (
        <CategoryList
          categories={sortedCategories}
          viewMode={viewMode}
          mutate={mutate}
        />
      )}
    </div>
  );
};

export default CategoryView;
