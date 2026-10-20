import { prisma } from "@/lib/prisma";
import BusinessForm from "../BusinessForm";

export const revalidate = 0;

export default async function NewBusinessPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">Add New Business Listing</h1>
        <p className="text-xs text-slate-400 mt-1">
          Add any Function Hall, Photographer, Caterer, Decorator, or Travels in Eluru.
        </p>
      </div>

      <BusinessForm categories={categories} />
    </div>
  );
}
