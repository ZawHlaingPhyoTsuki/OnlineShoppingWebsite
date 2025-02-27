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
import FilterBox from "../Common/FilterBox";
import SkeletonProduct from "../Common/SkeletonProduct";

// Fetcher function for productApi.getAll
const fetcher = ([_, params]) =>
  productApi.getAll(params).then((res) => res.data);

const ProductView = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You could make this configurable if needed
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "price:asc" | "price:desc">(
    "latest"
  );

  const { data, error, isLoading, mutate } = useSWR(
    [
      "/products",
      {
        page,
        limit,
        sortBy,
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

  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  const products = data?.products || [];
  const pagination = data?.pagination;

  const sortOptions = [
    { value: "latest", label: "Latest Products" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
  ];

  // handle filterbox
  const handleFilter = (value: "latest" | "price:asc" | "price:desc") => {
    setSortBy(value);
  };

  return (
    <div className="container mx-auto p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <FilterBox
          value={sortBy}
          onValueChange={handleFilter}
          placeholder="Sort By"
          options={sortOptions}
        />
        <ViewModeBtn viewMode={viewMode} setViewMode={setViewMode} />
      </div>

      <div className="flex flex-col justify-between h-full">
        {isLoading ? (
          <SkeletonProduct productStyle={viewMode} limit={limit} />
        ) : (
          <ProductList
            products={products}
            viewMode={viewMode}
            mutate={mutate}
          />
        )}

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
