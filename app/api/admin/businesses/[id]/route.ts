import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const data = await req.json();

    const updateData: any = { ...data };
    if (data.gallery && Array.isArray(data.gallery)) {
      updateData.gallery = JSON.stringify(data.gallery);
    }
    if (data.services && Array.isArray(data.services)) {
      updateData.services = JSON.stringify(data.services);
    }

    const updated = await prisma.business.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json({ success: true, business: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update business" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.business.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true, message: "Business deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete business" }, { status: 500 });
  }
}
