import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Search, Filter, SlidersHorizontal, ArrowLeft } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    q?: string;
    foodType?: string;
    capacity?: string;
    vehicle?: string;
    sort?: string;
  };
}

export const revalidate = 0;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = params;
  const { q, foodType, capacity, vehicle, sort } = searchParams;

  const [settings, category] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.category.findUnique({
      where: { slug },
      include: {
        businesses: {
          where: {
            isActive: true,
            AND: [
              q
                ? {
                    OR: [
                      { name: { contains: q } },
                      { teluguName: { contains: q } },
                      { managerName: { contains: q } },
                      { location: { contains: q } },
                      { description: { contains: q } },
                      { services: { contains: q } },
                    ],
                  }
                : {},
              foodType ? { foodType: { in: [foodType, "both"] } } : {},
              vehicle ? { vehicleTypes: { contains: vehicle } } : {},
            ],
          },
          include: { category: true },
          orderBy: sort === "name" ? { name: "asc" } : { isFeatured: "desc" },
        },
      },
    }),
  ]);

  if (!category) {
    notFound();
  }

  const defaultSettings = {
    websiteName: settings?.websiteName || "ELURU EVENT LINKS",
    teluguTagline: settings?.teluguTagline || "ఒక్క క్లిక్‌తో.. పెళ్లి పనులు సులువుగా!",
    founderName: settings?.founderName || "T. Ganesh Gowtham",
    publicEmail: settings?.publicEmail || "Elurueventlinks@gmail.com",
    primaryPhone: settings?.primaryPhone || "+91 99495 31668",
    whatsappNumber: settings?.whatsappNumber || "+91 9603921666",
    instagramUrl: settings?.instagramUrl || "https://www.instagram.com/eluru_event_links?stkn=cGE5cXgzazlkYzNu",
    address: settings?.address || "Eluru, Andhra Pradesh, India",
    footerText: settings?.footerText,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={defaultSettings} />

      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-brand-maroon via-slate-900 to-brand-maroon text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-900/50">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div>
            <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase block">
              Category Directory
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold tracking-tight mt-1">
              {category.name}
            </h1>
            {category.teluguName && (
              <p className="text-base sm:text-lg text-amber-200 mt-1 font-medium">
                {category.teluguName}
              </p>
            )}
            <p className="text-sm text-slate-300 max-w-2xl mt-2 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-b border-slate-200 py-4 sticky top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form method="GET" className="flex flex-wrap items-center justify-between gap-3">
            {/* Search input */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder={`Search inside ${category.name}...`}
                className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
              />
            </div>

            {/* Category-Specific Filters */}
            {category.slug === "catering" && (
              <select
                name="foodType"
                defaultValue={foodType || ""}
                className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
              >
                <option value="">All Food Types</option>
                <option value="vegetarian">Pure Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
              </select>
            )}

            {category.slug === "transportation" && (
              <select
                name="vehicle"
                defaultValue={vehicle || ""}
                className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
              >
                <option value="">All Vehicle Types</option>
                <option value="Cars">Cars</option>
                <option value="buses">Buses</option>
                <option value="sleeper">Sleeper</option>
              </select>
            )}

            {/* Sorting */}
            <select
              name="sort"
              defaultValue={sort || "featured"}
              className="text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-brand-maroon text-white text-xs sm:text-sm font-semibold rounded-xl hover:opacity-95 shadow-sm"
            >
              Filter
            </button>
          </form>
        </div>
      </div>

      {/* Directory Content List */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 flex-1 w-full">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="font-bold text-slate-900">{category.businesses.length}</span> verified{" "}
            {category.businesses.length === 1 ? "provider" : "providers"} in Eluru
          </p>
        </div>

        {category.businesses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-slate-900">
              No matching listings found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              We couldn&apos;t find any businesses in this category matching your filters. Try clearing your search filters or check back soon.
            </p>
            <Link
              href={`/category/${category.slug}`}
              className="inline-block px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800"
            >
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.businesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                centralWhatsAppNumber={defaultSettings.whatsappNumber}
              />
            ))}
          </div>
        )}
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
