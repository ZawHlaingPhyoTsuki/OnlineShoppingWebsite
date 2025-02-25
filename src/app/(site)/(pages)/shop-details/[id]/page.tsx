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
  const res = await productApi.getById(id)
  console.log(res)

  return (
    <main>
      {/* <ShopDetails productt={product} /> */}
    </main>
  );
};

export default ShopDetailsPage;
