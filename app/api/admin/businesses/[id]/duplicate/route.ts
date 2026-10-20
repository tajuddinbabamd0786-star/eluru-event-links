import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const original = await prisma.business.findUnique({
      where: { id: params.id },
    });

    if (!original) {
      return NextResponse.json({ error: "Original business not found" }, { status: 404 });
    }

    const { id, createdAt, updatedAt, ...rest } = original;

    const duplicated = await prisma.business.create({
      data: {
        ...rest,
        name: `${original.name} (Copy)`,
        isActive: false, // Inactive by default so admin can review
        isFeatured: false,
      },
    });

    return NextResponse.json({ success: true, business: duplicated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to duplicate business" }, { status: 500 });
  }
}
