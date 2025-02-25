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
  // const id = params.id;
  // const res = await productApi.getById(id)
  // console.log(res)

  const product = {
    name: "Havit HV-G69 USB Gamepad",
    description: "Hello",
    price: 59.0,
    discountedPrice: 29.0,
    id: "1",
    images: [
      "/images/products/product-1-bg-1.png",
      "/images/products/product-1-bg-2.png",
    ],
    color: ["red"],
    size: ["SM", "M"],
  };

  return (
    <main>
      <ShopDetails product={product} />
    </main>
  );
};

export default ShopDetailsPage;
