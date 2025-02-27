"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Category } from "@/types/category";
import { Label } from "../ui/label";
import { useState } from "react";
import { ChevronDown, PanelRightClose } from "lucide-react";
import CategoryRowItem from "./CategoryRowItem";

type CategoryBoxProps = {
  categories: Category[];
  handleCategoryFilter: (categoryId: string) => void;
  checkedCategory: string | null;
  setCheckedCategory: React.Dispatch<React.SetStateAction<string | null>>;
};

// For Mobile
const SheetSidebar = ({
  categories,
  handleCategoryFilter,
  checkedCategory,
  setCheckedCategory,
}: CategoryBoxProps) => {
  const handleRowClicked = (categoryId: string) => {
    setCheckedCategory((prev) => (prev === categoryId ? null : categoryId));
    handleCategoryFilter(categoryId);
  };

  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="bg-blue hover:bg-blue-light active:bg-blue-dark border-blue text-white flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:text-white">
            <PanelRightClose size={20} />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="z-99999 bg-meta p-0">
          <SheetHeader className="my-4 px-4">
            <SheetTitle className="flex justify-between items-center mt-6 mx-4">
              <span className="tracking-[.07em]">Filters:</span>
              <span
                className="text-blue font-thin text-sm cursor-pointer hover:text-blue-light active:text-blue-dark"
                onClick={() => {
                  setCheckedCategory(null);
                  handleCategoryFilter("");
                }}
              >
                Clear All
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 w-full px-4">
            <div className="flex items-center gap-2 w-full">
              <Collapsible defaultOpen className="w-full flex flex-col gap-3">
                <CollapsibleTrigger className="w-full flex justify-between items-center py-2 px-2 bg-white rounded-lg">
                  <Label className="pl-2 text-base">Category</Label>
                  <ChevronDown size={20} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
                    {categories.map((item) => (
                      <CategoryRowItem
                        key={item.id}
                        item={item}
                        handleRowClicked={handleRowClicked}
                        checkedCategory={checkedCategory}
                      />
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetSidebar;