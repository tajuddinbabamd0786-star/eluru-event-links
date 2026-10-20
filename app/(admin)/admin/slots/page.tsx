import { prisma } from "@/lib/prisma";
import SlotsClientView from "./SlotsClientView";

export const revalidate = 0;

export default async function AdminSlotsPage() {
  const [businesses, slots] = await Promise.all([
    prisma.business.findMany({
      where: { category: { slug: "function-halls" } },
      select: { id: true, name: true, location: true },
      orderBy: { name: "asc" },
    }),
    prisma.slot.findMany({
      include: { business: true },
      orderBy: { date: "asc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">
          Slots & Availability Management ({slots.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure dates, start/end times, and booking statuses for Eluru function halls. Conflicting double-bookings are strictly checked.
        </p>
      </div>

      <SlotsClientView businesses={businesses} initialSlots={slots} />
    </div>
  );
}
