import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { PlusCircle, Search, Sparkles, Building2, Trash2, Edit3, Copy, CheckCircle2, XCircle } from "lucide-react";
import BusinessActions from "./BusinessActions";

interface AdminBusinessesPageProps {
  searchParams: {
    category?: string;
    q?: string;
  };
}

export const revalidate = 0;

export default async function AdminBusinessesPage({ searchParams }: AdminBusinessesPageProps) {
  const { category, q } = searchParams;

  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: "asc" } }),
    prisma.business.findMany({
      where: {
        AND: [
          category ? { category: { slug: category } } : {},
          q
            ? {
                OR: [
                  { name: { contains: q } },
                  { teluguName: { contains: q } },
                  { phone: { contains: q } },
                  { managerName: { contains: q } },
                ],
              }
            : {},
        ],
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-2xl font-bold text-white">
            Manage Businesses ({businesses.length})
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, activate/deactivate, feature, or remove directory records in the database.
          </p>
        </div>

        <Link
          href="/admin/businesses/new"
          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:opacity-95 shadow-md"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Business</span>
        </Link>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          <Link
            href="/admin/businesses"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
              !category ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-white"
            }`}
          >
            All Categories
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/admin/businesses?category=${c.slug}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                category === c.slug ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <form method="GET" className="flex items-center gap-2 w-full sm:w-auto">
          {category && <input type="hidden" name="category" value={category} />}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 w-full">
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search by name, phone..."
              className="bg-transparent focus:outline-none w-full"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Businesses Table */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Business / Telugu Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Manager & Phone</th>
                <th className="p-3.5">Location</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {businesses.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No businesses found matching this criteria.
                  </td>
                </tr>
              ) : (
                businesses.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                          <Image
                            src={b.mainImage || "/logo.png"}
                            alt={b.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{b.name}</p>
                          {b.teluguName && (
                            <p className="text-[11px] text-amber-400">{b.teluguName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-amber-300 text-[11px] font-medium">
                        {b.category.name}
                      </span>
                    </td>
                    <td className="p-3.5 space-y-0.5">
                      <p className="text-white font-medium">{b.phone}</p>
                      {b.managerName && (
                        <p className="text-slate-400 text-[11px]">{b.managerName}</p>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-300">{b.location}</td>
                    <td className="p-3.5 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                        }`}>
                          {b.isActive ? "ACTIVE" : "INACTIVE"}
                        </span>
                        {b.isFeatured && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> FEATURED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-right">
                      <BusinessActions business={b} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
