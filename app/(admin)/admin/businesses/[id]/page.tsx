import { prisma } from "@/lib/prisma";
import BusinessForm from "../BusinessForm";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function EditBusinessPage({ params }: { params: { id: string } }) {
  const [categories, business] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.business.findUnique({ where: { id: params.id } }),
  ]);

  if (!business) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">Edit &ldquo;{business.name}&rdquo;</h1>
        <p className="text-xs text-slate-400 mt-1">
          Update facilities, seating capacity, contact numbers, or active status.
        </p>
      </div>

      <BusinessForm categories={categories} initialData={business} />
    </div>
  );
}
