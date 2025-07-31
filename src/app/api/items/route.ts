import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: アイテム一覧を取得
export async function GET() {
  try {
    const items = await prisma.sharedItem.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch items:", error);
    return NextResponse.json(
      { error: "Failed to fetch items" },
      { status: 500 },
    );
  }
}

// POST: 新しいアイテムを作成
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const item = await prisma.sharedItem.create({
      data: {
        id: Date.now().toString(),
        name,
        isExisted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to create item:", error);
    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 },
    );
  }
}
