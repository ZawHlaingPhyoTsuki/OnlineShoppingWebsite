"use client";
import React from "react";
import { Grid, List } from "lucide-react";
import useSWR from "swr";
import FilterBox from "../Common/FilterBox";
import SheetSidebar from "./SheetSidebar";
import CategoryBox from "./CategoryBox";
import ProductSection from "./ProductSection";
import PaginationComponent from "./PaginationComponent";
import { productApi } from "@/lib/api";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { pagination } from "@/types/pagination";
import { useShopStore } from "@/store";

const fetcher = ([_, params]) =>
  productApi.getAll(params).then((res) => res.data);

const SORT_OPTIONS = [
  { value: "latest", label: "Latest Products" },
  { value: "price:asc", label: "Price: Low to High" },
  { value: "price:desc", label: "Price: High to Low" },
];

type ShopClientProps = {
  initialCategories: Category[];
  initialProducts: Product[];
  initialPagination: pagination;
};

export default function ShopClient({
  initialCategories,
  initialProducts,
  initialPagination,
}: ShopClientProps) {
  const {
    filterState,
    viewState,
    setCurrentPage,
    setCategoryId,
    setCheckedCategory,
    setSortBy,
    setProductStyle,
  } = useShopStore();

  const { data, isLoading } = useSWR(
    [
      "/products",
      {
        page: filterState.currentPage,
        limit: viewState.limit,
        categoryId: filterState.categoryId,
        sortBy: filterState.sortBy,
      },
    ],
    fetcher,
    {
      fallbackData: {
        products: initialProducts,
        pagination: initialPagination,
      },
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  );

  const products = data?.products || initialProducts;
  const pagination = data?.pagination || initialPagination;

  const handleViewChange = (style: "grid" | "list") => setProductStyle(style);
  const handleFilter = (value: string) => setSortBy(value);
  const handleCategoryFilter = (id: string) => {
    const nextCategoryId = id === filterState.categoryId ? null : id;
    const nextCheckedCategory = id === filterState.checkedCategory ? null : id;
    setCategoryId(nextCategoryId);
    setCheckedCategory(nextCheckedCategory);
  };
  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <>
      <div className="hidden lg:flex flex-col gap-6 max-w-[310px] xl:max-w-[270px] w-full">
        <CategoryBox
          categories={initialCategories}
          handleCategoryFilter={handleCategoryFilter}
          checkedCategory={filterState.checkedCategory}
          setCheckedCategory={setCheckedCategory}
        />
      </div>

      <div className="xl:max-w-[870px] w-full">
        <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <SheetSidebar
                categories={initialCategories}
                handleCategoryFilter={handleCategoryFilter}
                checkedCategory={filterState.checkedCategory}
                setCheckedCategory={setCheckedCategory}
              />
              <FilterBox
                value={filterState.sortBy}
                onValueChange={handleFilter}
                placeholder="Sort By"
                options={SORT_OPTIONS}
              />
            </div>

            <div className="flex items-center gap-2.5">
              {(["grid", "list"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => handleViewChange(style)}
                  aria-label={`button for product ${style} tab`}
                  className={`${
                    viewState.productStyle === style
                      ? "bg-blue border-blue text-white"
                      : "text-dark bg-gray-1 border-gray-3"
                  } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue hover:text-white active:bg-blue-dark`}
                >
                  {style === "grid" ? <Grid size={20} /> : <List size={20} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ProductSection
          productStyle={viewState.productStyle}
          products={products}
          isLoading={isLoading}
          limit={viewState.limit}
        />

        <PaginationComponent
          currentPage={filterState.currentPage}
          pagination={pagination}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
