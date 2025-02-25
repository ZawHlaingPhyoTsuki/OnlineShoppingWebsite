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

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const CategoryView = () => {
  const { data, error, isLoading, mutate } = useSWR("/categories", fetcher); // Added mutate for refreshing data
  const categories = data as CategoryType[];
  console.log(categories);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end items-center mb-4">
        <ViewModeBtn viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <CategoryList
        categories={categories}
        viewMode={viewMode}
        mutate={mutate} // Pass mutate to refresh data after edits/deletes
      />
    </div>
  );
};

type CategoryListProps = {
  categories: CategoryType[];
  viewMode: "grid" | "list";
  mutate: () => void; // Added for data refresh
};

const CategoryList = ({ categories, viewMode, mutate }: CategoryListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null); // Track which category is being edited
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string | undefined>(
    ""
  );

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
      setEditingId(null); // Exit edit mode
      mutate();
    } catch (error) {
      toast.error("Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryApi.delete(id);
        toast.success("Category deleted successfully");
        mutate();
      } catch (error) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div
      className={`grid gap-4 ${
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
                  <div>
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
                viewMode == "grid" ? "justify-between" : "justify-end"
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
