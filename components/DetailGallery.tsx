"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

interface DetailGalleryProps {
  mainImage: string | null;
  galleryImages: string[];
  businessName: string;
  categoryName: string;
}

export default function DetailGallery({
  mainImage,
  galleryImages,
  businessName,
  categoryName,
}: DetailGalleryProps) {
  const defaultPlaceholder = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
  const [selectedImage, setSelectedImage] = useState<string>(mainImage || defaultPlaceholder);
  const [hasError, setHasError] = useState(false);

  const allImages = [
    ...(mainImage ? [mainImage] : []),
    ...galleryImages.filter((img) => img !== mainImage),
  ];

  return (
    <div className="space-y-4">
      {/* Main Showcase Image */}
      <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md border border-amber-100 bg-slate-900">
        {hasError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-slate-400 p-4 text-center">
            <ImageOff className="w-10 h-10 text-slate-600 mb-2" />
            <p className="text-xs">Image unavailable</p>
          </div>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={selectedImage}
            alt={businessName}
            className="w-full h-full object-cover"
            onError={() => {
              if (selectedImage !== defaultPlaceholder) {
                setSelectedImage(defaultPlaceholder);
              } else {
                setHasError(true);
              }
            }}
          />
        )}
        <div className="absolute top-4 left-4 bg-brand-maroon text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md z-10">
          {categoryName}
        </div>
      </div>

      {/* Thumbnails row */}
      {allImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedImage(img);
                setHasError(false);
              }}
              className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === img
                  ? "border-amber-500 scale-95 shadow-md ring-2 ring-amber-400/40"
                  : "border-slate-200 hover:border-amber-300 opacity-80 hover:opacity-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${businessName} thumb ${idx + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultPlaceholder;
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
