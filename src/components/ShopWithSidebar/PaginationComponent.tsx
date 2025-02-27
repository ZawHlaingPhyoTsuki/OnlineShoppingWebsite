// components/Pagination.tsx
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button"; // Import Button
import { pagination } from "@/types/pagination";

interface PaginationProps {
  currentPage: number;
  pagination?: pagination;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  pagination,
  isLoading,
  onPageChange,
}: PaginationProps) => {
  if (!pagination || isLoading) {
    return null; // Don’t render pagination if no data, only one page, or loading
  }

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination className="mt-14">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            isActive={!(currentPage === 1)}
            className={`${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-white cursor-pointer"
            }`}
          />
        </PaginationItem>
        {getPageNumbers().map((pageNum) => (
          <PaginationItem key={pageNum}>
            <Button
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                handlePageClick(pageNum);
              }}
              disabled={isLoading}
              className={`w-8 h-8 ${
                currentPage === pageNum ? "bg-meta text-meta-2" : "text-meta"
              } hover:bg-white`}
            >
              {pageNum}
            </Button>
          </PaginationItem>
        ))}
        {pagination.totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            isActive={!(currentPage === pagination.totalPages)}
            className={`${
              currentPage === pagination.totalPages
                ? "pointer-events-none opacity-50"
                : "hover:bg-white cursor-pointer"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
