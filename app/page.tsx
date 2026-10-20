import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessCard from "@/components/BusinessCard";
import EnquiryForm from "@/components/EnquiryForm";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, 
  Camera, 
  UtensilsCrossed, 
  Sparkles, 
  Bus, 
  Search, 
  CheckCircle, 
  Award, 
  ShieldCheck, 
  Users, 
  Calendar, 
  Star,
  ArrowRight,
  PhoneCall,
  Clock,
  Compass,
  MessageCircle
} from "lucide-react";
import { formatWhatsAppUrl, formatTelUrl } from "@/lib/utils";

export const revalidate = 0; // Dynamic server rendering to always reflect live admin updates

export default async function HomePage() {
  const [settings, categories, featuredBusinesses, testimonials] = await Promise.all([
    prisma.siteSetting.findUnique({ where: { id: "default" } }),
    prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { businesses: { where: { isActive: true } } },
        },
      },
    }),
    prisma.business.findMany({
      where: { isActive: true, isFeatured: true },
      include: { category: true },
      take: 6,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.testimonial.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
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
    heroHeading: settings?.heroHeading || "Plan Your Perfect Event in Eluru",
    heroDescription: settings?.heroDescription || "Discover trusted local function halls, photographers, catering services, decorators, and transportation providers—all in one place.",
    heroImage: settings?.heroImage || "https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png",
    footerText: settings?.footerText,
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "function-halls": return <Building2 className="w-6 h-6 text-brand-gold" />;
      case "photography": return <Camera className="w-6 h-6 text-brand-pink" />;
      case "catering": return <UtensilsCrossed className="w-6 h-6 text-amber-600" />;
      case "decoration": return <Sparkles className="w-6 h-6 text-purple-600" />;
      case "transportation": return <Bus className="w-6 h-6 text-blue-600" />;
      default: return <Sparkles className="w-6 h-6 text-brand-gold" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header settings={defaultSettings} />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#FCFAF6] pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs sm:text-sm font-medium shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                <span>{defaultSettings.teluguTagline}</span>
              </div>

              <h1 className="font-playfair text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.15] tracking-tight">
                {defaultSettings.heroHeading}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                {defaultSettings.heroDescription}
              </p>

              {/* Quick Search Input */}
              <div id="search-section" className="pt-2">
                <form action="/search" method="GET" className="bg-white p-2 rounded-2xl shadow-lg border border-amber-200 flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto lg:mx-0">
                  <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
                    <Search className="w-5 h-5 text-amber-600 shrink-0" />
                    <input
                      type="text"
                      name="q"
                      placeholder="Search halls, photographers, catering, 400 seating..."
                      className="w-full py-2 bg-transparent text-sm focus:outline-none text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-brand-maroon via-amber-800 to-brand-maroon text-white font-medium text-sm hover:opacity-95 shadow-md transition-all whitespace-nowrap"
                  >
                    Search Directory
                  </button>
                </form>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/category/function-halls"
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Find Function Halls</span>
                </Link>

                <Link
                  href="/#categories"
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-sm shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Explore Event Services</span>
                  <ArrowRight className="w-4 h-4 text-brand-maroon" />
                </Link>

                <a
                  href={formatWhatsAppUrl(defaultSettings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-2 border-t border-amber-200/60 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="font-playfair text-xl sm:text-2xl font-bold text-brand-maroon">100%</p>
                  <p className="text-xs text-slate-500">Verified Eluru Listings</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-playfair text-xl sm:text-2xl font-bold text-amber-700">Direct</p>
                  <p className="text-xs text-slate-500">Vendor Call & Chat</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-playfair text-xl sm:text-2xl font-bold text-brand-maroon">Zero</p>
                  <p className="text-xs text-slate-500">Commission Fee</p>
                </div>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold via-brand-pink to-brand-maroon rounded-3xl blur-xl opacity-30 animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-[4/3] sm:aspect-[16/11]">
                  <Image
                    src={defaultSettings.heroImage || "/logo.png"}
                    alt="Event celebrations in Eluru"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                      Celebrations & Weddings
                    </p>
                    <p className="text-sm font-playfair font-bold">
                      Venkatrama, VTR Grand & Top Eluru Venues
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FIVE CATEGORIES SECTION */}
      <section id="categories" className="py-16 sm:py-24 bg-white border-b border-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">
              Browse by Category
            </h2>
            <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Everything You Need for Weddings & Functions
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Explore dynamic listings across 5 primary event service sectors in Eluru and surrounding mandals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative bg-[#FCFAF6] hover:bg-white rounded-2xl p-5 border border-amber-100/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat.slug)}
                  </div>
                  <h4 className="font-playfair font-bold text-slate-900 text-lg group-hover:text-brand-maroon transition-colors">
                    {cat.name}
                  </h4>
                  {cat.teluguName && (
                    <p className="text-xs text-amber-700 font-medium mt-0.5">
                      {cat.teluguName}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-600 bg-amber-100/70 px-2 py-0.5 rounded-full">
                    {cat._count.businesses} Active {cat._count.businesses === 1 ? 'Listing' : 'Listings'}
                  </span>
                  <span className="text-brand-maroon font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED BUSINESSES */}
      {featuredBusinesses.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#FAF7F0] border-b border-amber-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
                  Handpicked & Verified
                </span>
                <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900">
                  Featured Event Providers in Eluru
                </h3>
              </div>
              <Link
                href="/category/function-halls"
                className="text-sm font-semibold text-brand-maroon hover:text-amber-800 flex items-center gap-1 group"
              >
                <span>View all verified listings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBusinesses.map((b) => (
                <BusinessCard
                  key={b.id}
                  business={b}
                  centralWhatsAppNumber={defaultSettings.whatsappNumber}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. WHY CHOOSE ELURU EVENT LINKS */}
      <section className="py-16 sm:py-20 bg-white border-b border-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Local Advantages
            </span>
            <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
              Why Choose Eluru Event Links?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              We make event discovery effortless with verified direct contacts for everyone in and around Eluru.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-4 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Verified Local Venues</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct phone numbers of managers for genuine Function Halls, Decorators, and Travel services in Eluru without middlemen.
              </p>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 mb-4 shadow-sm">
                <Clock className="w-7 h-7" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Instant WhatsApp & Call</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                One-tap connection to check venue availability, muhurtham slots, seating capacity, and catering quotations right on WhatsApp.
              </p>
            </div>

            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mb-4 shadow-sm">
                <Compass className="w-7 h-7" />
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Comprehensive Directory</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                From mandapam bookings to drone photography, vegetarian catering boys, floral setups, and bus travels all under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-16 sm:py-20 bg-[#FAF7F0] border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
              Simple 3-Step Process
            </span>
            <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
              How It Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 text-center relative">
              <div className="w-10 h-10 rounded-full bg-brand-maroon text-white font-bold text-base flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Search Category</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Choose Function Halls, Photography, Catering, Decoration, or Transportation to explore available providers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 text-center relative">
              <div className="w-10 h-10 rounded-full bg-brand-gold text-slate-900 font-bold text-base flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Compare Facilities</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Check seating capacity, AC/non-AC rooms, parking availability, catering specialties, and vehicle fleets.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h4 className="font-playfair text-lg font-bold text-slate-900 mb-2">Connect Directly</h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Tap the Call or WhatsApp button to discuss dates, check slot availability, and finalize bookings directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION (ACTIVE ONLY) */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-24 bg-white border-b border-amber-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Real Customer Feedback
              </span>
              <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
                What Families in Eluru Say
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#FCFAF6] p-7 rounded-2xl border border-amber-100 shadow-neu-card flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base italic leading-relaxed">
                      &ldquo;{t.reviewText}&rdquo;
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-100 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-semibold text-slate-900">{t.customerName}</p>
                      {t.eventType && <p className="text-amber-700">{t.eventType}</p>}
                    </div>
                    <span className="text-slate-400">Verified User</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. HOMEPAGE CONTACT & ENQUIRY FORM */}
      <section className="py-16 sm:py-24 bg-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
                Direct Contact & Support
              </span>
              <h3 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Planning an Event or Need Help Selecting a Venue?
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reach out to the team at Eluru Event Links. We are delighted to guide you to the right function halls, catering squads, or photography crew for your family function.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Public Primary Phone</p>
                    <a
                      href={formatTelUrl(defaultSettings.primaryPhone)}
                      className="text-base font-bold text-slate-900 hover:text-brand-maroon transition-colors"
                    >
                      {defaultSettings.primaryPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Central WhatsApp Assistance</p>
                    <a
                      href={formatWhatsAppUrl(defaultSettings.whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      {defaultSettings.whatsappNumber}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

          </div>
        </div>
      </section>

      <Footer settings={defaultSettings} />
    </div>
  );
}
