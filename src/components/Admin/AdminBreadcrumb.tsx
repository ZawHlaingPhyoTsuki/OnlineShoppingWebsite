"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const AdminBreadcrumb = () => {
  const currentPath = usePathname();

  const breadcrumbPath = currentPath
    .split("/") // Split by "/"
    .slice(1) // Remove the leading empty string
    .map(
      (item) =>
        item
          .split("-") // Split by hyphens
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
          .join(" ") // Join with spaces
    );

  // Build cumulative paths for each breadcrumb item
  const pathSegments = currentPath.split("/").slice(1); // e.g., ["admin", "view-all-products"]
  const cumulativePaths = pathSegments.map(
    (_, index) => "/" + pathSegments.slice(0, index + 1).join("/")
  ); // e.g., ["/admin", "/admin/view-all-products"]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbPath.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index === breadcrumbPath.length - 1 ? (
                <BreadcrumbPage>{item}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={cumulativePaths[index]}>
                  {item}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
