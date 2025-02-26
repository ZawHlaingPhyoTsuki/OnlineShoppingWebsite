"use client";

import { productApi } from "@/lib/api";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ViewModeBtn from "./ViewModeBtn";
import ProductList from "./ProductList";
import PreLoader from "../Common/PreLoader";
import Pagination from "./Pagination";

// Fetcher function for productApi.getAll
const fetcher = ([_, params]: [string, any]) =>
  productApi.getAll(params).then((res) => res.data);

const ProductView = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You could make this configurable if needed
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "price-low" | "price-high">(
    "latest"
  );

  const { data, error, isLoading, mutate } = useSWR(
    [
      "/products",
      {
        page,
        limit,
        // Add other filters as needed
        // categoryId: "some-id",
        // minPrice: "10",
        // maxPrice: "100",
        // name: "search-term",
      },
    ],
    fetcher,
    {
      revalidateOnFocus: false, // Optional: customize SWR behavior
      keepPreviousData: true, // Keeps previous data while fetching new page
    }
  );

  if (isLoading && !data) return <PreLoader />;
  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  const products = data?.products || [];
  const pagination = data?.pagination;

  // Sort products based on price
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "latest") return 0; // No sorting for "latest" (assumes API default order)
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "latest" | "price-low" | "price-high")
          }
        >
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest Products</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <ViewModeBtn viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="flex flex-col justify-between h-full">
        <ProductList
          products={sortedProducts}
          viewMode={viewMode}
          mutate={mutate}
        />

        {/* Pagination Controls */}
        {pagination && (
          <Pagination
            pagination={pagination}
            setPage={setPage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default ProductView;
