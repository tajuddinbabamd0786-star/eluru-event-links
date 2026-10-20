import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function TermsPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });

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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
            Platform Agreement
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-900">
            Terms and Conditions
          </h1>
          <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of the Directory Service</h2>
            <p>
              <strong>{defaultSettings.websiteName}</strong> operates as a localized business directory and discovery platform connecting clients with independent event services (function halls, photographers, caterers, decorators, and travel companies) in Eluru.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Direct Contracts & Bookings</h2>
            <p>
              All final contracts, dates, pricing agreements, token payments, and service delivery are directly agreed between the customer and the respective business owner. We do not process direct booking payments on this portal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Information Accuracy</h2>
            <p>
              While we physically verify business phone numbers and facilities, clients are encouraged to inspect halls, check sample menus, and inspect vehicles prior to paying deposits.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Inquiries & Feedback</h2>
            <p>
              For grievances or questions regarding terms, reach out to Founder {defaultSettings.founderName} at <a href={`mailto:${defaultSettings.publicEmail}`} className="text-brand-maroon underline">{defaultSettings.publicEmail}</a>.
            </p>
          </section>
        </div>
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
