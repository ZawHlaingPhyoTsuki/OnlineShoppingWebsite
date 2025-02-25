"use client";

import apiClient from "@/lib/axios";
import useSWR from "swr";
import { useState } from "react";
import ViewModeBtn from "./ViewModeBtn";
import { CategoryType } from "@/types/myProduct";
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

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const CategoryView = () => {
  const { data, error, isLoading, mutate } = useSWR("/categories", fetcher);
  const categories = data as CategoryType[];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"stock-low" | "stock-high" | "default">(
    "default"
  );

  if (isLoading) return <PreLoader />;
  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  // Sort categories based on stock (products.length)
  const sortedCategories = [...(categories || [])].sort((a, b) => {
    const aStock = a.products?.length || 0;
    const bStock = b.products?.length || 0;

    if (sortBy === "default") return 0; // No sorting for default

    if (sortBy === "stock-low") {
      return aStock - bStock; // Ascending order (low to high stock)
    }

    if (sortBy === "stock-high") {
      return bStock - aStock; // Descending order (high to low stock)
    }

    return 0;
  });

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
      <CategoryList
        categories={sortedCategories}
        viewMode={viewMode}
        mutate={mutate}
      />
    </div>
  );
};

type CategoryListProps = {
  categories: CategoryType[];
  viewMode: "grid" | "list";
  mutate: () => void;
};

const CategoryList = ({ categories, viewMode, mutate }: CategoryListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string | undefined>(
    ""
  );
  const [isDeleteLoadingBtn, setIsDeleteLoadingBtn] = useState<boolean>(false);

  const handleEditStart = (category: CategoryType) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditDescription(category.description);
  };

  const handleEditSave = async (id: string) => {
    try {
      const updatedData = {
        name: editName,
        description: editDescription,
      };
      await categoryApi.update(id, updatedData);
      toast.success("Category updated successfully");
      setEditingId(null);
      mutate();
    } catch (error) {
      toast.error("Failed to update category");
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
        setIsDeleteLoadingBtn(true);
        await categoryApi.delete(id);
        toast.success("Category deleted successfully");
        mutate();
        setIsDeleteLoadingBtn(false);
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div
      className={`grid gap-5 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          : "flex flex-col"
      }`}
    >
      {categories?.map((category) => (
        <div
          key={category.id}
          className={`bg-white rounded-lg shadow p-4 pb-6 border border-muted/50 ${
            viewMode === "list" ? "flex items-center gap-4" : ""
          }`}
        >
          <div
            className={`bg-muted/50 rounded-md ${
              viewMode === "grid" ? "w-full h-32" : "w-24 h-24"
            }`}
          ></div>

          <div className={`flex-1 ${viewMode === "list" ? "" : "mt-4"}`}>
            {editingId === category.id ? (
              <>
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="mb-2"
                  placeholder="Category name"
                />
                <Textarea
                  value={editDescription || ""}
                  onChange={(e) => setEditDescription(e.target.value)}
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
                      category.products.length > 0
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
              {editingId === category.id ? (
                <>
                  <Button size="sm" onClick={() => handleEditSave(category.id)}>
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
                    onClick={() => handleEditStart(category)}
                    className="bg-blue-500 hover:bg-blue-600 text-gray-7"
                  >
                    <Pencil className="w-5 h-5" />
                  </Button>
                  <Button
                    disabled={isDeleteLoadingBtn}
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
      ))}
    </div>
  );
};

export default CategoryView;
