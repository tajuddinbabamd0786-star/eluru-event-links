"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageOff, Loader2 } from "lucide-react";

interface SafeImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
}

export default function SafeImagePreview({
  src,
  alt,
  className = "w-full h-full object-cover",
  fallbackText = "Image preview unavailable",
}: SafeImagePreviewProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!src || !src.trim()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    const img = new window.Image();
    img.src = src.trim();
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  if (!src || !src.trim() || status === "error") {
    return (
      <div className="w-full h-full bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-500 select-none">
        <ImageOff className="w-5 h-5 text-slate-600 mb-1" />
        <span className="text-[10px] leading-tight text-slate-400 font-medium line-clamp-2">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 z-10">
          <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src.trim()}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
