import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    await prisma.slot.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, message: "Slot removed" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to remove slot" }, { status: 500 });
  }
}
