import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const { customerName, eventType, reviewText, rating, isActive } = await req.json();
    const created = await prisma.testimonial.create({
      data: {
        customerName: customerName.trim(),
        eventType: eventType?.trim() || null,
        reviewText: reviewText.trim(),
        rating: Number(rating) || 5,
        isActive: Boolean(isActive),
      },
    });
    return NextResponse.json({ success: true, testimonial: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create testimonial" }, { status: 500 });
  }
}
