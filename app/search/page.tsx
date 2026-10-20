import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import Link from "next/link";
import { Search, ArrowLeft } from "lucide-react";

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export const revalidate = 0;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || "";

  const [settings, results] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    query
      ? prisma.business.findMany({
          where: {
            isActive: true,
            OR: [
              { name: { contains: query } },
              { teluguName: { contains: query } },
              { managerName: { contains: query } },
              { location: { contains: query } },
              { description: { contains: query } },
              { services: { contains: query } },
              { seatingCapacity: { contains: query } },
              { vehicleTypes: { contains: query } },
              { foodType: { contains: query } },
            ],
          },
          include: { category: true },
          orderBy: { isFeatured: "desc" },
        })
      : [],
  ]);

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

      <div className="bg-[#FAF7F0] border-b border-amber-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-brand-maroon hover:underline font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          <div>
            <h1 className="font-playfair text-3xl font-bold text-slate-900">
              {query ? `Search Results for "${query}"` : "Search Directory"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Search across function halls, photographers, catering boys, flower decorators, and travels in Eluru.
            </p>
          </div>

          <form method="GET" action="/search" className="max-w-xl">
            <div className="flex items-center gap-2 bg-white border border-amber-200 rounded-xl px-3 py-2 shadow-sm">
              <Search className="w-5 h-5 text-amber-600 shrink-0" />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Try 'VTR', 'Photography', '400 seating', 'Sleeper bus'..."
                className="w-full text-sm bg-transparent focus:outline-none text-slate-800"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-brand-maroon text-white text-xs font-semibold rounded-lg hover:opacity-90"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {query === "" ? (
          <div className="text-center py-12 text-slate-500 text-sm">
            Please enter a keyword above to search through active businesses.
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-slate-900">
              No results found for &ldquo;{query}&rdquo;
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Check your spelling or try searching for broader terms like &quot;Eluru&quot;, &quot;Halls&quot;, or &quot;Catering&quot;.
            </p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 bg-brand-maroon text-white text-xs font-semibold rounded-xl hover:opacity-95"
            >
              Browse All Categories
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Found <span className="font-bold text-slate-900">{results.length}</span> matching businesses in Eluru:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  centralWhatsAppNumber={defaultSettings.whatsappNumber}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
