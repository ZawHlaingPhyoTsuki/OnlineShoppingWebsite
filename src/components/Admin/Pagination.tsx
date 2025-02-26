import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pagination } from "@/types/pagination";

type PaginationProps = {
  pagination: pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  setPage,
  isLoading,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (pagination.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= pagination.totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={pagination.currentPage === i ? "default" : "outline"}
            onClick={() => setPage(i)}
            className="px-3.5 py-1.5"
            disabled={isLoading}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Show ellipsis for large page counts
      const startPages = [1, 2];
      const endPages = [pagination.totalPages - 1, pagination.totalPages];

      if (pagination.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(
            <Button
              key={i}
              variant={pagination.currentPage === i ? "default" : "outline"}
              onClick={() => setPage(i)}
              className="px-3.5 py-1.5"
              disabled={isLoading}
            >
              {i}
            </Button>
          );
        }
        pages.push(<span key="ellipsis-start">...</span>);
        pages.push(
          <Button
            key={pagination.totalPages}
            variant="outline"
            onClick={() => setPage(pagination.totalPages)}
            className="px-3.5 py-1.5"
            disabled={isLoading}
          >
            {pagination.totalPages}
          </Button>
        );
      } else if (pagination.currentPage >= pagination.totalPages - 2) {
        pages.push(
          <Button
            key={1}
            variant="outline"
            onClick={() => setPage(1)}
            className="px-3.5 py-1.5"
            disabled={isLoading}
          >
            1
          </Button>
        );
        pages.push(<span key="ellipsis-end">...</span>);
        for (
          let i = pagination.totalPages - 3;
          i <= pagination.totalPages;
          i++
        ) {
          pages.push(
            <Button
              key={i}
              variant={pagination.currentPage === i ? "default" : "outline"}
              onClick={() => setPage(i)}
              className="px-3.5 py-1.5"
              disabled={isLoading}
            >
              {i}
            </Button>
          );
        }
      } else {
        pages.push(
          <Button
            key={1}
            variant="outline"
            onClick={() => setPage(1)}
            className="px-3.5 py-1.5"
            disabled={isLoading}
          >
            1
          </Button>
        );
        pages.push(<span key="ellipsis-start">...</span>);
        for (
          let i = pagination.currentPage - 1;
          i <= pagination.currentPage + 1;
          i++
        ) {
          pages.push(
            <Button
              key={i}
              variant={pagination.currentPage === i ? "default" : "outline"}
              onClick={() => setPage(i)}
              className="px-3.5 py-1.5"
              disabled={isLoading}
            >
              {i}
            </Button>
          );
        }
        pages.push(<span key="ellipsis-end">...</span>);
        pages.push(
          <Button
            key={pagination.totalPages}
            variant="outline"
            onClick={() => setPage(pagination.totalPages)}
            className="px-3.5 py-1.5"
            disabled={isLoading}
          >
            {pagination.totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white shadow-md rounded-md p-2">
        <ul className="flex items-center space-x-1">
          {/* Previous Button */}
          <li>
            <Button
              id="paginationLeft"
              aria-label="button for pagination left"
              type="button"
              disabled={!pagination.hasPrevPage || isLoading}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              variant="outline"
              size="icon"
              className="w-8 h-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </li>

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Button */}
          <li>
            <Button
              id="paginationRight"
              aria-label="button for pagination right"
              type="button"
              disabled={!pagination.hasNextPage || isLoading}
              onClick={() => setPage((prev) => prev + 1)}
              variant="outline"
              size="icon"
              className="w-8 h-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
