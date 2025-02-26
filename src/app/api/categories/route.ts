import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Category } from "@/types/category";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  try {
    const categories = await prisma.category.findMany({
      where: {
        ...(name && { name: { contains: name, mode: "insensitive" } }),
      },
      include: { products: true },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body : Category = await request.json();
    const { name, description, image } = body;

    const category = await prisma.category.create({
      data: {
        name,
        description,
        image
      },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}
