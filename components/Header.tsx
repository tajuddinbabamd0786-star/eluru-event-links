"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, MessageCircle, Menu, X, Search, HeartHandshake } from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";

interface HeaderProps {
  settings: {
    websiteName: string;
    teluguTagline: string;
    primaryPhone: string;
    whatsappNumber: string;
  };
}

export default function Header({ settings }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Function Halls", href: "/category/function-halls" },
    { name: "Photography", href: "/category/photography" },
    { name: "Catering", href: "/category/catering" },
    { name: "Decoration", href: "/category/decoration" },
    { name: "Transportation", href: "/category/transportation" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Banner with phone & whatsapp quick actions */}
      <div className="bg-gradient-to-r from-brand-maroon via-brand-purple to-brand-maroon text-white text-xs sm:text-sm py-1.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="hidden md:flex items-center gap-1.5 font-medium tracking-wide">
            <HeartHandshake className="w-4 h-4 text-brand-gold-light" />
            <span>{settings.teluguTagline} — Your Trusted Eluru Celebration Partner</span>
          </p>
          <div className="flex items-center gap-4 ml-auto sm:ml-0">
            <a
              href={formatTelUrl(settings.primaryPhone)}
              className="flex items-center gap-1.5 hover:text-brand-gold-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{settings.primaryPhone}</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href={formatWhatsAppUrl(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium text-emerald-400"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-gold/60 shadow-md group-hover:scale-105 transition-transform duration-300 bg-white">
              <Image
                src="/logo.png"
                alt="Eluru Event Links Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-brand-maroon transition-colors block leading-tight">
                ELURU EVENT LINKS
              </span>
              <span className="text-[11px] text-amber-700 font-medium tracking-wider uppercase block">
                Directory & Event Services
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-brand-maroon transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-gold hover:after:w-full after:transition-all"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/#search-section"
              className="p-2.5 rounded-full text-slate-600 hover:text-brand-maroon hover:bg-amber-50 transition-colors"
              title="Search businesses"
            >
              <Search className="w-5 h-5" />
            </Link>
            <a
              href={formatWhatsAppUrl(settings.whatsappNumber, "Hello, I want to list or enquire about an event business on Eluru Event Links.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Free Enquiry</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden gap-2">
            <a
              href={formatWhatsAppUrl(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pt-2 pb-3 border-b border-slate-100">
            <a
              href={formatTelUrl(settings.primaryPhone)}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-amber-50 text-amber-900 rounded-xl font-medium text-sm"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call Us</span>
            </a>
            <a
              href={formatWhatsAppUrl(settings.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-50 text-emerald-800 rounded-xl font-medium text-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-amber-50 hover:text-brand-maroon transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center text-xs text-slate-500 hover:text-brand-maroon py-2"
            >
              Administrator Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
