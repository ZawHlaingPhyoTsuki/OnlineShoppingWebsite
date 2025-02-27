import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Product } from "@/types/product";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const name = searchParams.get("name");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const sortBy = searchParams.get("sortBy") || "latest";

  try {
    const skip = (page - 1) * limit;

    let orderBy = {};
    switch (sortBy) {
      case "latest":
        orderBy = { createdAt: "desc" };
        break;
      case "price:asc":
        orderBy = { price: "asc" };
        break;
      case "price:desc":
        orderBy = { price: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const totalCount = await prisma.product.count({
      where: {
        ...(categoryId && { categoryId }),
        ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
        ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
        ...(name && { name: { contains: name, mode: "insensitive" } }),
      },
    });

    const products = await prisma.product.findMany({
      where: {
        ...(categoryId && { categoryId }),
        ...(minPrice && { price: { gte: parseFloat(minPrice) } }),
        ...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
        ...(name && { name: { contains: name, mode: "insensitive" } }),
      },
      include: { category: true },
      skip,
      take: limit,
      orderBy,
    });

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: Omit<Product, "createdAt" | "updatedAt"> = await request.json();
    const {
      name,
      description,
      price,
      discountedPrice,
      categoryId,
      images,
      color,
      size,
    } = body;

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discountedPrice,
        categoryId,
        images,
        color,
        size,
        // createdAt and updatedAt will be automatically set by Prisma
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
