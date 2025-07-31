import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT: アイテムを更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { isExisted } = await request.json();

    const item = await prisma.sharedItem.update({
      where: { id: params.id },
      data: {
        isExisted,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 },
    );
  }
}

// DELETE: アイテムを削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.sharedItem.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 },
    );
  }
}
