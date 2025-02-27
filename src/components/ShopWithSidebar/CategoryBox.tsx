"use client";

import { Category } from "@/types/category";
import { useState } from "react";
import { Label } from "../ui/label";
import CategoryRowItem from "./CategoryRowItem";

type CategoryBoxProps = {
  categories: Category[];
  handleCategoryFilter: (categoryName: string) => void;
  checkedCategory: string | null;
  setCheckedCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

// For Desktop
const CategoryBox = ({
  categories,
  handleCategoryFilter,
  checkedCategory,
  setCheckedCategory
}: CategoryBoxProps) => {
  const handleRowClicked = (categoryId: string) => {
    setCheckedCategory((prev) => (prev === categoryId ? null : categoryId));
    handleCategoryFilter(categoryId);
  };

  return (
    <>
      <div className="bg-white shadow-1 rounded-lg py-4 px-4 flex justify-between items-center">
        <span className="tracking-[.07em]">Filters:</span>
        <span
          onClick={() => {
            setCheckedCategory(null);
            handleCategoryFilter("");
          }}
          className="text-blue font-thin text-sm cursor-pointer hover:text-blue-light active:text-blue-dark"
        >
          Clear All
        </span>
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex justify-between items-center py-2 px-2 bg-white rounded-lg">
            <Label className="pl-2 text-base">Category</Label>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="flex flex-col gap-4">
              {categories.map((item) => (
                <CategoryRowItem
                  key={item.id}
                  item={item}
                  handleRowClicked={handleRowClicked}
                  checkedCategory={checkedCategory}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBox;
