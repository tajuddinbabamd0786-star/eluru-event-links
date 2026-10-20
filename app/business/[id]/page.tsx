import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import EnquiryForm from "@/components/EnquiryForm";
import DetailGallery from "@/components/DetailGallery";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Navigation, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft,
  Building,
  Sparkles,
  Info
} from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";

interface BusinessDetailPageProps {
  params: {
    id: string;
  };
}

export const revalidate = 0;

export default async function BusinessDetailPage({ params }: BusinessDetailPageProps) {
  const { id } = params;

  const [settings, business] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.business.findUnique({
      where: { id },
      include: {
        category: true,
        slots: {
          orderBy: { date: "asc" },
        },
      },
    }),
  ]);

  if (!business || !business.isActive) {
    notFound();
  }

  // Related businesses in the same category
  const relatedBusinesses = await prisma.business.findMany({
    where: {
      categoryId: business.categoryId,
      id: { not: business.id },
      isActive: true,
    },
    take: 3,
    include: { category: true },
  });

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

  let galleryImages: string[] = [];
  if (business.gallery) {
    try {
      galleryImages = JSON.parse(business.gallery);
    } catch {
      galleryImages = [business.gallery];
    }
  }

  let serviceList: string[] = [];
  if (business.services) {
    try {
      serviceList = JSON.parse(business.services);
    } catch {
      serviceList = business.services.split(",").map((s) => s.trim());
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={defaultSettings} />

      {/* Breadcrumb Header */}
      <div className="bg-[#FAF7F0] border-b border-amber-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brand-maroon">Home</Link>
            <span>/</span>
            <Link href={`/category/${business.category.slug}`} className="hover:text-brand-maroon font-medium">
              {business.category.name}
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs">{business.name}</span>
          </div>

          <Link
            href={`/category/${business.category.slug}`}
            className="inline-flex items-center gap-1 text-brand-maroon font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {business.category.name}</span>
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full space-y-10">
        
        {/* Main Header & Image Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Gallery & Images */}
          <div className="lg:col-span-7">
            <DetailGallery
              mainImage={business.mainImage}
              galleryImages={galleryImages}
              businessName={business.name}
              categoryName={business.category.name}
            />
          </div>

          {/* Right: Business Quick Info & Primary Actions */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-neu-card space-y-6">
            <div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                {business.name}
              </h1>
              {business.teluguName && (
                <p className="text-base sm:text-lg text-amber-700 font-semibold mt-1">
                  {business.teluguName}
                </p>
              )}
              <div className="flex items-center gap-1.5 text-slate-500 text-xs sm:text-sm mt-3">
                <MapPin className="w-4 h-4 text-brand-maroon shrink-0" />
                <span>{business.location}</span>
                {business.serviceArea && business.serviceArea !== business.location && (
                  <span>— {business.serviceArea}</span>
                )}
              </div>
            </div>

            {/* Direct Call & WhatsApp Action Buttons */}
            <div className="space-y-3 pt-2">
              <a
                href={formatTelUrl(business.phone)}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Business Manager ({business.phone})</span>
              </a>

              <a
                href={formatWhatsAppUrl(
                  defaultSettings.whatsappNumber,
                  `Hello, I would like to enquire about "${business.name}" in ${business.location} on Eluru Event Links.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via Central WhatsApp</span>
              </a>

              {business.secondaryPhone && (
                <a
                  href={formatTelUrl(business.secondaryPhone)}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>Secondary Contact: {business.secondaryPhone}</span>
                </a>
              )}
            </div>

            {/* Manager and Direct Links */}
            <div className="pt-4 border-t border-slate-100 space-y-3 text-xs sm:text-sm">
              {business.managerName && business.managerName !== "Information not provided" && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Contact / Manager:</span>
                  <span className="font-semibold text-slate-800">{business.managerName}</span>
                </div>
              )}

              {business.googleMapsUrl && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Directions:</span>
                  <a
                    href={business.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-maroon hover:underline flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              )}

              {business.websiteUrl && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Official Website:</span>
                  <a
                    href={business.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-brand-maroon hover:underline flex items-center gap-1 truncate max-w-[200px]"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Visit Website</span>
                  </a>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Detailed Facilities & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* Description & Advantages */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-neu-card space-y-4">
              <h2 className="font-playfair text-xl font-bold text-slate-900 border-b border-amber-100 pb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-700" />
                <span>About {business.name}</span>
              </h2>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {business.description || "Information not provided."}
              </p>

              {business.advantages && (
                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200/80">
                  <h4 className="font-semibold text-amber-900 text-xs uppercase tracking-wider mb-1">
                    Key Highlights & Advantages
                  </h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {business.advantages}
                  </p>
                </div>
              )}
            </div>

            {/* Category Specifications */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-neu-card space-y-4">
              <h3 className="font-playfair text-xl font-bold text-slate-900 border-b border-amber-100 pb-3">
                Facilities & Service Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {business.seatingCapacity && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 block text-xs">Seating Capacity:</span>
                    <span className="font-bold text-slate-900 text-base">{business.seatingCapacity} Seats</span>
                  </div>
                )}

                {business.rooms && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 block text-xs">Guest & Bride Rooms:</span>
                    <span className="font-semibold text-slate-900">{business.rooms}</span>
                  </div>
                )}

                {business.carParking && (
                  <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="font-semibold">Dedicated Car Parking Available</span>
                  </div>
                )}

                {business.busAccess && (
                  <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
                    <span className="text-blue-600 block text-xs">Road & Bus Access:</span>
                    <span className="font-semibold">{business.busAccess}</span>
                  </div>
                )}

                {business.foodType && (
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <span className="text-amber-800 block text-xs">Food Options:</span>
                    <span className="font-bold text-amber-900 capitalize">
                      {business.foodType === "both" ? "Vegetarian and Non-Vegetarian" : `${business.foodType} only`}
                    </span>
                  </div>
                )}

                {business.vehicleTypes && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 block text-xs">Vehicles:</span>
                    <span className="font-semibold text-slate-900">{business.vehicleTypes}</span>
                  </div>
                )}

                {business.vehicleCapacities && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 block text-xs">Available Capacities:</span>
                    <span className="font-semibold text-slate-900">{business.vehicleCapacities}</span>
                  </div>
                )}

                {business.serviceType && (
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <span className="text-slate-500 block text-xs">Service Type:</span>
                    <span className="font-semibold text-slate-900">{business.serviceType}</span>
                  </div>
                )}
              </div>

              {/* Service list items */}
              {serviceList.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Services Included:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {serviceList.map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-900 text-xs font-medium rounded-lg border border-purple-200"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Configured Slots and Availability */}
            {business.slots.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-100 shadow-neu-card space-y-4">
                <h3 className="font-playfair text-xl font-bold text-slate-900 border-b border-amber-100 pb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-700" />
                  <span>Public Availability & Booking Slots</span>
                </h3>

                <div className="space-y-2">
                  {business.slots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm bg-slate-50 border-slate-200"
                    >
                      <div>
                        <p className="font-semibold text-slate-800">
                          {slot.date} ({slot.startTime} - {slot.endTime})
                        </p>
                        {slot.notes && <p className="text-slate-500 text-xs">{slot.notes}</p>}
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full font-bold text-xs ${
                          slot.status === "AVAILABLE"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {slot.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right: Embedded Booking / Enquiry Form */}
          <div className="lg:col-span-5 sticky top-28">
            <EnquiryForm
              businessId={business.id}
              businessName={business.name}
              categorySlug={business.category.slug}
            />
          </div>

        </div>

        {/* Related Businesses */}
        {relatedBusinesses.length > 0 && (
          <div className="pt-12 border-t border-amber-100 space-y-6">
            <h3 className="font-playfair text-2xl font-bold text-slate-900">
              Other {business.category.name} in Eluru
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBusinesses.map((b) => (
                <BusinessCard
                  key={b.id}
                  business={b}
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
