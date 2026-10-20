import { prisma } from "@/lib/prisma";
import EnquiriesClientView from "./EnquiriesClientView";

export const revalidate = 0;

export default async function AdminEnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    include: { business: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">
          Customer Enquiries ({enquiries.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review submissions, contact clients, and track status: NEW, CONTACTED, CONFIRMED, COMPLETED, CANCELLED.
        </p>
      </div>

      <EnquiriesClientView initialEnquiries={enquiries} />
    </div>
  );
}
