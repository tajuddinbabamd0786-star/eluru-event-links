import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const { businessId, date, startTime, endTime, status, notes } = await req.json();

    if (!businessId || !date || !startTime || !endTime) {
      return NextResponse.json(
        { error: "Business ID, date, start time, and end time are required." },
        { status: 400 }
      );
    }

    // Backend Double-Booking Prevention: Check if conflicting slot exists for the same business & date
    if (status === "BOOKED" || status === "AVAILABLE") {
      const conflictingSlot = await prisma.slot.findFirst({
        where: {
          businessId,
          date,
          status: "BOOKED",
          OR: [
            {
              startTime: { lte: startTime },
              endTime: { gt: startTime },
            },
            {
              startTime: { lt: endTime },
              endTime: { gte: endTime },
            },
            {
              startTime: { gte: startTime },
              endTime: { lte: endTime },
            },
          ],
        },
      });

      if (conflictingSlot && status === "BOOKED") {
        return NextResponse.json(
          {
            error: `Conflicting slot conflict! A confirmed booking already exists on ${date} between ${conflictingSlot.startTime} and ${conflictingSlot.endTime}.`,
          },
          { status: 409 }
        );
      }
    }

    const slot = await prisma.slot.create({
      data: {
        businessId,
        date,
        startTime,
        endTime,
        status: status || "AVAILABLE",
        notes: notes?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, slot }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create slot" }, { status: 500 });
  }
}
