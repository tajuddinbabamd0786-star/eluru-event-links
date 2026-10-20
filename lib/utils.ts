import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatWhatsAppUrl(phone: string, text: string = "Hello, I found your business on Eluru Event Links. I would like to know more about your services.") {
  // Strip non-digits
  const cleanDigits = phone.replace(/\D/g, '');
  const phoneWithCode = cleanDigits.startsWith('91') && cleanDigits.length > 10 ? cleanDigits : `91${cleanDigits.slice(-10)}`;
  return `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(text)}`;
}

export function formatTelUrl(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
