import { pagination } from "@/types/pagination";
import React from "react";

type PaginationProps = {
  pagination: pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};
const Pagination = ({ pagination, setPage, isLoading }: PaginationProps) => {
  return (
    <div className="mt-4 flex justify-center items-center gap-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={!pagination.hasPrevPage || isLoading}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>
        Page {pagination.currentPage} of {pagination.totalPages} (
        {pagination.totalCount} products)
      </span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={!pagination.hasNextPage || isLoading}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
