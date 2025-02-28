import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { categoryApi, productApi } from "@/lib/api";
import { Category } from "@/types/category";
import ShopClient from "./ShopClient";
import { Product } from "@/types/product";
import { pagination } from "@/types/pagination";

// Fetch data server-side
async function fetchInitialData() {
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      categoryApi.getAll(),
      productApi.getAll({ page: 1, limit: 9, sortBy: "latest" }),
    ]);
    return {
      initialCategories: categoriesRes.data as Category[],
      initialProducts: productsRes.data.products as Product[],
      initialPagination: productsRes.data.pagination as pagination,
    };
  } catch (error) {
    console.error("Failed to fetch initial data:", error);
    return {
      initialCategories: [],
      initialProducts: [],
      initialPagination: {
        currentPage: 1,
        limit: 9,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

export default async function ShopWithSidebar() {
  const { initialCategories, initialProducts, initialPagination } =
    await fetchInitialData();

  return (
    <>
      <Breadcrumb title="Explore All Products" pages={["shop"]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Pass initial data to client component */}
            <ShopClient
              initialCategories={initialCategories}
              initialProducts={initialProducts}
              initialPagination={initialPagination}
            />
          </div>
        </div>
      </section>
    </>
  );
}
