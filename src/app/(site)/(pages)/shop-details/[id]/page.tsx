import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { productApi } from "@/lib/api";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;

  try {
    // Fetch the product by ID using productApi
    const product = await productApi.getById(id);

    // Log to the server terminal for debugging (optional)
    console.log("Fetched product:", product);

    return (
      <main>
        <ShopDetails product={product.data} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <main>
        <p>Error loading product details. Please try again later.</p>
      </main>
    );
  }
};

export default ShopDetailsPage;
