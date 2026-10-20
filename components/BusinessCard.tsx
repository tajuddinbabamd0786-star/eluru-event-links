"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Users, CheckCircle2, ChevronRight, Navigation, Sparkles } from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";
import { useState } from "react";

interface BusinessCardProps {
  business: {
    id: string;
    name: string;
    teluguName?: string | null;
    managerName?: string | null;
    phone: string;
    secondaryPhone?: string | null;
    location: string;
    serviceArea?: string | null;
    googleMapsUrl?: string | null;
    websiteUrl?: string | null;
    mainImage?: string | null;
    description?: string | null;
    seatingCapacity?: string | null;
    carParking?: boolean;
    rooms?: string | null;
    busAccess?: string | null;
    foodType?: string | null;
    services?: string | null;
    vehicleTypes?: string | null;
    vehicleCapacities?: string | null;
    acType?: string | null;
    sleeperAvailable?: boolean;
    serviceType?: string | null;
    isFeatured?: boolean;
    category?: {
      slug: string;
      name: string;
    };
  };
  centralWhatsAppNumber?: string;
}

export default function BusinessCard({ business, centralWhatsAppNumber }: BusinessCardProps) {
  const [imgError, setImgError] = useState(false);

  // Parse services array if stored as JSON
  let serviceList: string[] = [];
  if (business.services) {
    try {
      serviceList = JSON.parse(business.services);
    } catch {
      serviceList = business.services.split(",").map((s) => s.trim());
    }
  }

  const defaultImg = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
  const displayImage = imgError || !business.mainImage ? defaultImg : business.mainImage;
  const whatsappTarget = centralWhatsAppNumber || business.phone;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-100/80 shadow-neu-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative">
      {/* Featured Badge */}
      {business.isFeatured && (
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 fill-white" />
          <span>Featured</span>
        </div>
      )}

      {/* Category Tag */}
      {business.category && (
        <div className="absolute top-3 right-3 z-20 bg-slate-900/80 backdrop-blur-md text-amber-300 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-400/30">
          {business.category.name}
        </div>
      )}

      {/* Image Banner */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <Image
          src={displayImage}
          alt={business.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Name and Telugu Name on lower image overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <h3 className="font-playfair text-lg sm:text-xl font-bold leading-tight drop-shadow-md line-clamp-1">
            {business.name}
          </h3>
          {business.teluguName && (
            <p className="text-xs text-amber-200 font-medium drop-shadow line-clamp-1">
              {business.teluguName}
            </p>
          )}
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Primary Meta Attributes */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-4 h-4 text-brand-maroon shrink-0" />
            <span className="font-medium text-slate-700 truncate">{business.location}</span>
            {business.serviceArea && business.serviceArea !== business.location && (
              <span className="text-slate-400 truncate">({business.serviceArea})</span>
            )}
          </div>

          {business.managerName && business.managerName !== "Information not provided" && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <span className="font-semibold text-slate-700">Manager:</span>
              <span className="truncate">{business.managerName}</span>
            </div>
          )}

          {/* Function Hall Specific Attributes */}
          {business.seatingCapacity && (
            <div className="flex items-center gap-1.5 text-slate-600 bg-amber-50/70 p-1.5 rounded-lg border border-amber-100">
              <Users className="w-4 h-4 text-amber-700 shrink-0" />
              <span className="font-medium">Capacity: {business.seatingCapacity} seats</span>
            </div>
          )}

          {/* Rooms and Parking Badges */}
          {(business.rooms || business.carParking || business.busAccess) && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {business.rooms && (
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {business.rooms}
                </span>
              )}
              {business.carParking && (
                <span className="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Car Parking
                </span>
              )}
              {business.busAccess && (
                <span className="text-[11px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md font-medium">
                  {business.busAccess}
                </span>
              )}
            </div>
          )}

          {/* Catering Specific Attribute */}
          {business.foodType && (
            <div className="inline-block mt-1">
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider ${
                business.foodType === 'vegetarian'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : business.foodType === 'non-vegetarian'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {business.foodType === 'both' ? 'Veg & Non-Veg Available' : `${business.foodType} only`}
              </span>
            </div>
          )}

          {/* Photography & Decor Services preview */}
          {serviceList.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {serviceList.slice(0, 3).map((srv, idx) => (
                <span key={idx} className="text-[11px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md">
                  {srv}
                </span>
              ))}
              {serviceList.length > 3 && (
                <span className="text-[11px] text-slate-500 font-medium">
                  +{serviceList.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Transportation Attributes */}
          {(business.vehicleTypes || business.vehicleCapacities) && (
            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs space-y-1">
              {business.vehicleTypes && (
                <p className="font-medium text-slate-800">
                  <span className="text-slate-500">Vehicles:</span> {business.vehicleTypes}
                </p>
              )}
              {business.vehicleCapacities && (
                <p className="text-slate-600">
                  <span className="text-slate-500">Capacities:</span> {business.vehicleCapacities}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={formatTelUrl(business.phone)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
            
            <a
              href={formatWhatsAppUrl(
                whatsappTarget,
                `Hello, I found "${business.name}" on Eluru Event Links. I would like to check availability and details.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-between pt-1">
            {business.googleMapsUrl ? (
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-slate-500 hover:text-brand-maroon flex items-center gap-1 underline"
              >
                <Navigation className="w-3 h-3 text-brand-maroon" />
                <span>Directions</span>
              </a>
            ) : <span />}

            <Link
              href={`/business/${business.id}`}
              className="text-xs text-brand-maroon hover:text-amber-700 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform"
            >
              <span>View Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
