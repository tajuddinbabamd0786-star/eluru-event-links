import { prisma } from "@/lib/prisma";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryForm from "@/components/EnquiryForm";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";

export const revalidate = 0;

export default async function ContactPage() {
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
              Get In Touch
            </span>
            <h1 className="font-playfair text-3xl sm:text-5xl font-bold">
              Contact Eluru Event Links
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Have questions, need help selecting a hall, or want to list your business in Eluru? Reach out to us directly.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-2">
                  Official Communication
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You can call or WhatsApp our central support desk. We operate throughout Eluru to support upcoming weddings and events.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={formatTelUrl(defaultSettings.primaryPhone)}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-maroon flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Primary Phone</p>
                    <p className="text-base font-bold text-slate-900">{defaultSettings.primaryPhone}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Available for calls 9 AM - 9 PM</p>
                  </div>
                </a>

                <a
                  href={formatWhatsAppUrl(defaultSettings.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-emerald-700 uppercase font-semibold">WhatsApp Desk</p>
                    <p className="text-base font-bold text-slate-900">{defaultSettings.whatsappNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Instant chat & quotation inquiries</p>
                  </div>
                </a>

                <a
                  href={`mailto:${defaultSettings.publicEmail}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-100 shadow-sm hover:border-amber-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Public Email</p>
                    <p className="text-sm font-bold text-slate-900 break-all">{defaultSettings.publicEmail}</p>
                    <p className="text-xs text-slate-500 mt-0.5">For partnerships & event queries</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-semibold">Head Office / Location</p>
                    <p className="text-sm font-bold text-slate-900">{defaultSettings.address}</p>
                    <p className="text-xs text-slate-500 mt-0.5">West Godavari District, Andhra Pradesh</p>
                  </div>
                </div>

                <a
                  href={defaultSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-pink-100 shadow-sm hover:border-pink-400 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-pink-700 uppercase font-semibold">Official Instagram</p>
                    <p className="text-sm font-bold text-slate-900">@eluru_event_links</p>
                    <p className="text-xs text-slate-500 mt-0.5">Follow latest wedding event coverage</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Direct Enquiry Form Column */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

          </div>
        </div>
      </main>

      <Footer settings={defaultSettings} />
    </div>
  );
}
