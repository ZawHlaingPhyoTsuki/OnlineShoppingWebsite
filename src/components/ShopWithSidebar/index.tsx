"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { categoryApi, productApi } from "@/lib/api";
import { toast } from "sonner";
import { Category } from "@/types/category";
import useSWR from "swr";
import {
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from "lucide-react";
import FilterBox from "../Common/FilterBox";
import SheetSidebar from "./SheetSidebar";
import CategoryBox from "./CategoryBox";
import ProductSection from "./ProductSection";

const fetcher = ([_, params]) =>
  productApi.getAll(params).then((res) => res.data);

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [categories, setCategories] = useState<Category[]>([]);
  const [limit, setLimit] = useState(9);
  const [page, setPage] = useState(1);
  const [checkedCategory, setCheckedCategory] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("latest");


  // fetch categories
  useEffect(() => {
    categoryApi
      .getAll()
      .then((response) => setCategories(response.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // fetch products with swr
  const { data, error, isLoading, mutate } = useSWR(
    [
      "/products",
      {
        page,
        limit,
        categoryId,
        // sortBy: "price:asc",
        sortBy,
      },
    ],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
    }
  );

  const products = data?.products;
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  const totalProduct = pagination?.totalCount;

  // Pagination handlers
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // handle filterbox
  const handleFilter = (value: string) => {
    setSortBy(value);
  };

  // handle category filter, filter by category id
  const handleCategoryFilter = (id: string) => {
    setCategoryId(id === categoryId ? null : id);
  };

  const sortOptions = [
    { value: "latest", label: "Latest Products" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
  ];

  return (
    <>
      <Breadcrumb title={"Explore All Products"} pages={["shop"]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* <!-- Sidebar Start --> */}
            <div className="hidden lg:flex flex-col gap-6 max-w-[310px] xl:max-w-[270px] w-full">
              {/* <!-- category box for desktop --> */}
              <CategoryBox
                categories={categories}
                handleCategoryFilter={handleCategoryFilter}
                checkedCategory={checkedCategory}
                setCheckedCategory={setCheckedCategory}
              />
            </div>
            {/* // <!-- Sidebar End --> */}

            {/* // <!-- Content Start --> */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  {/* <!-- top bar left --> */}
                  <div className="flex flex-wrap items-center gap-4">
                    {/* <!-- category box for mobile */}
                    <SheetSidebar
                      categories={categories}
                      handleCategoryFilter={handleCategoryFilter}
                      checkedCategory={checkedCategory}
                      setCheckedCategory={setCheckedCategory}
                    />
                    <FilterBox
                      value={sortBy}
                      onValueChange={handleFilter}
                      placeholder="Sort By"
                      options={sortOptions}
                    />
                  </div>

                  {/* <!-- top bar right GRID LIST BUTTON --> */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="button for product grid tab"
                      className={`${
                        productStyle === "grid"
                          ? "bg-blue hover:bg-blue-light active:bg-blue-dark border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue active:bg-blue-dark hover:text-white`}
                    >
                      <Grid size={20} />
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="button for product list tab"
                      className={`${
                        productStyle === "list"
                          ? "bg-blue hover:bg-blue-light active:bg-blue-dark border-blue text-white"
                          : "text-dark bg-gray-1 border-gray-3"
                      } flex items-center justify-center w-10.5 h-9 rounded-[5px] border ease-out duration-200 hover:bg-blue hover:border-blue active:bg-blue-dark hover:text-white`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Products Grid LIST Content Start --> */}
              <ProductSection
                productStyle={productStyle}
                products={products}
                isLoading={isLoading}
                limit={limit}
              />
              {/* <!-- Products Grid LIST Content End --> */}

              {/* <!-- Products Pagination Start --> */}
              <div className="flex justify-center mt-15">
                <div className="bg-white shadow-1 rounded-md p-2">
                  <ul className="flex items-center">
                    <li>
                      <button
                        id="paginationLeft"
                        aria-label="button for pagination left"
                        type="button"
                        disabled
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px disabled:text-gray-4"
                      >
                        <ChevronLeft size={16} />
                      </button>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] bg-blue text-white hover:text-white hover:bg-blue"
                      >
                        1
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        2
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        3
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        4
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        5
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        ...
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-200 rounded-[3px] hover:text-white hover:bg-blue"
                      >
                        10
                      </a>
                    </li>

                    <li>
                      <button
                        id="paginationLeft"
                        aria-label="button for pagination left"
                        type="button"
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-[3px] hover:text-white hover:bg-blue disabled:text-gray-4"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <!-- Products Pagination End --> */}
            </div>
            {/* // <!-- Content End --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;

