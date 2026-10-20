import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, MapPin, Award } from "lucide-react";

export const revalidate = 0;

export default async function AboutPage() {
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

      <main className="flex-1">
        <div className="bg-gradient-to-r from-brand-maroon via-slate-950 to-brand-maroon text-white py-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">
              About Our Platform
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold">
              Connecting Eluru’s Celebrations with Trust
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              {defaultSettings.teluguTagline} — Empowering local families and event business owners with direct communication and reliable listings.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                Our Founder & Mission
              </span>
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-slate-900">
                Founded by {defaultSettings.founderName}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Planning a marriage, reception, upanayanam, or birthday celebration traditionally required visiting dozens of offices across Eluru. 
                <strong> ELURU EVENT LINKS</strong> was born to streamline this entire journey into a single, beautifully organized digital directory.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                We believe in transparency: no hidden middleman cuts, no exaggerated rates, and no fake reviews. You connect directly with the hall manager, chief photographer, catering squad, flower designer, and travel coordinator.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 p-6 flex flex-col items-center text-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-brand-gold shadow-md bg-white mb-4">
                <Image src="/logo.png" alt="Eluru Event Links" fill className="object-contain p-2" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-slate-900">{defaultSettings.websiteName}</h3>
              <p className="text-xs text-amber-700 font-semibold mt-1">Eluru, Andhra Pradesh</p>
              <p className="text-xs text-slate-500 mt-2">Connecting 100+ local providers and thousands of happy families.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-200">
            <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm text-center">
              <ShieldCheck className="w-8 h-8 text-amber-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">100% Verified</h4>
              <p className="text-xs text-slate-600">Every business is physically verified in Eluru with confirmed phone numbers.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm text-center">
              <HeartHandshake className="w-8 h-8 text-brand-maroon mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">Direct Relationships</h4>
              <p className="text-xs text-slate-600">Speak directly with venue owners and service managers on Phone & WhatsApp.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-amber-100 shadow-sm text-center">
              <MapPin className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 mb-1">Deep Local Roots</h4>
              <p className="text-xs text-slate-600">Focused exclusively on Eluru, VTR Square, and surrounding mandals in Andhra Pradesh.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
