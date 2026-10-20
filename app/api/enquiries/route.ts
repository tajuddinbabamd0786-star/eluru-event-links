import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerName, phone, email, eventDate, preferredSlot, message, businessId, categorySlug } = body;

    if (!customerName || !phone || !message) {
      return NextResponse.json(
        { error: "Customer name, phone number, and message are required fields." },
        { status: 400 }
      );
    }

    // Persist to database
    const enquiry = await prisma.enquiry.create({
      data: {
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        eventDate: eventDate || null,
        preferredSlot: preferredSlot ? preferredSlot.trim() : null,
        message: message.trim(),
        businessId: businessId || null,
        categorySlug: categorySlug || null,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true, enquiryId: enquiry.id }, { status: 201 });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: "Internal server error saving enquiry. Please try again later." },
      { status: 500 }
    );
  }
}
