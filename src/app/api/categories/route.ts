import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    // Fetch categories with their products
    const categories = await prisma.category.findMany({
      include: { products: true }, // Include products to count them
    });

    // Sort categories by the number of products in descending order
    const sortedCategories = categories.sort((a, b) => {
      const aProductCount = (a.products || []).length;
      const bProductCount = (b.products || []).length;
      return bProductCount - aProductCount; // Descending order
    });

    return NextResponse.json(sortedCategories);
  } catch (error) {
    console.error("GET /categories error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image } = body;

    // Basic validation
    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        image,
      },
    });
    console.log("Category created:", category);

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST /categories error:", error);
    return NextResponse.json(
      { error: "Failed to create category", details: error.message },
      { status: 500 }
    );
  }
}
