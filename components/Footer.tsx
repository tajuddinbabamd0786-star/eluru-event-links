import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Heart, ShieldCheck, Clock } from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";

interface FooterProps {
  settings: {
    websiteName: string;
    founderName: string;
    publicEmail: string;
    primaryPhone: string;
    whatsappNumber: string;
    instagramUrl: string;
    address: string;
    footerText?: string | null;
  };
}

export default function Footer({ settings }: FooterProps) {
  const categories = [
    { name: "Function Halls", href: "/category/function-halls" },
    { name: "Photography & Video", href: "/category/photography" },
    { name: "Catering & Boys", href: "/category/catering" },
    { name: "Flower & Stage Decoration", href: "/category/decoration" },
    { name: "Travels & Bus Transportation", href: "/category/transportation" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-amber-900/40 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-maroon/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Founder Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-gold/80 bg-white">
                <Image
                  src="/logo.png"
                  alt="Eluru Event Links"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-playfair text-xl font-bold tracking-tight text-white block">
                  {settings.websiteName}
                </span>
                <span className="text-xs text-brand-gold font-medium">
                  Founded by {settings.founderName}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              Eluru’s premier wedding and event discovery portal. We connect families with trusted banquet halls, caterers, decorators, and travels across West Godavari.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-pink-400 hover:text-white hover:border-pink-500 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-purple-600 transition-all duration-300 shadow-sm"
                aria-label="Instagram profile"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={formatWhatsAppUrl(settings.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 hover:bg-emerald-800 hover:text-white text-xs font-semibold tracking-wide transition-all duration-200 flex items-center gap-2"
              >
                <span>WhatsApp Live</span>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Event Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="hover:text-brand-gold transition-colors block py-0.5"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Quick & Legal Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors block py-0.5">
                  About Us & Vision
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors block py-0.5">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-gold transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-gold transition-colors block py-0.5">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-500 hover:text-slate-400 transition-colors block py-0.5 text-xs">
                  Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              Get in Touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-slate-400">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={formatTelUrl(settings.primaryPhone)}
                  className="hover:text-brand-gold transition-colors font-medium text-white"
                >
                  {settings.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`mailto:${settings.publicEmail}`}
                  className="hover:text-brand-gold transition-colors text-slate-300 break-all"
                >
                  {settings.publicEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>
            {settings.footerText || `© ${new Date().getFullYear()} ${settings.websiteName}. All Rights Reserved.`}
          </p>
          <p className="flex items-center gap-1.5 text-slate-400">
            <span>Designed for Eluru with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by T. Ganesh Gowtham</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
