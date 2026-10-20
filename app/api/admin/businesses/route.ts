import { requireAdmin } from "@/lib/adminAuth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if (!auth.authorized) return auth.response;

  try {
    const data = await req.json();

    if (!data.name || !data.phone || !data.categoryId) {
      return NextResponse.json(
        { error: "Business name, phone number, and category are required." },
        { status: 400 }
      );
    }

    const business = await prisma.business.create({
      data: {
        name: data.name.trim(),
        teluguName: data.teluguName?.trim() || null,
        categoryId: data.categoryId,
        managerName: data.managerName?.trim() || null,
        phone: data.phone.trim(),
        secondaryPhone: data.secondaryPhone?.trim() || null,
        location: data.location?.trim() || "Eluru",
        serviceArea: data.serviceArea?.trim() || null,
        googleMapsUrl: data.googleMapsUrl?.trim() || null,
        websiteUrl: data.websiteUrl?.trim() || null,
        mainImage: data.mainImage?.trim() || null,
        gallery: data.gallery ? JSON.stringify(data.gallery) : null,
        description: data.description?.trim() || null,
        advantages: data.advantages?.trim() || null,
        seatingCapacity: data.seatingCapacity?.trim() || null,
        carParking: Boolean(data.carParking),
        parkingDetails: data.parkingDetails?.trim() || null,
        rooms: data.rooms?.trim() || null,
        busAccess: data.busAccess?.trim() || null,
        foodType: data.foodType || null,
        services: Array.isArray(data.services) ? JSON.stringify(data.services) : data.services || null,
        vehicleTypes: data.vehicleTypes?.trim() || null,
        vehicleCapacities: data.vehicleCapacities?.trim() || null,
        acType: data.acType || null,
        sleeperAvailable: Boolean(data.sleeperAvailable),
        serviceType: data.serviceType || null,
        isFeatured: Boolean(data.isFeatured),
        isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      },
    });

    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error: any) {
    console.error("Create business error:", error);
    return NextResponse.json({ error: error.message || "Failed to create business" }, { status: 500 });
  }
}
