import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 0;

export default async function PrivacyPage() {
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
            Legal & Compliance
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-slate-900">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">Last updated: October 2026</p>
        </div>

        <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit an event enquiry through <strong>{defaultSettings.websiteName}</strong>, we collect your name, phone number, optional email address, expected event date, and specific celebration details.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              Your contact details are solely used to facilitate communication between you and the respective function halls, caterers, photographers, decorators, or transportation services you select. We do not sell or rent private customer information to unauthorized third-party advertisers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Data Protection & Confidentiality</h2>
            <p>
              Private customer enquiry messages, phone numbers, and reservation slots are stored in a secure database protected by server-side authentication policies. Only authorized administrators and verified business managers access enquiry records.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Contact Information</h2>
            <p>
              For questions regarding privacy, please contact Founder {defaultSettings.founderName} via email at <a href={`mailto:${defaultSettings.publicEmail}`} className="text-brand-maroon underline">{defaultSettings.publicEmail}</a> or via phone at {defaultSettings.primaryPhone}.
            </p>
          </section>
        </div>
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
