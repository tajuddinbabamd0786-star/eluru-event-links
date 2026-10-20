import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "default" } });
  return {
    title: {
      default: settings?.websiteName || "ELURU EVENT LINKS — Event Services & Function Halls in Eluru",
      template: "%s | ELURU EVENT LINKS",
    },
    description: settings?.heroDescription || "Discover trusted local function halls, photographers, catering services, decorators, and transportation providers in Eluru, Andhra Pradesh.",
    icons: {
      icon: "/logo.png",
      apple: "/logo.png",
    },
    openGraph: {
      title: "ELURU EVENT LINKS — Event Services & Function Halls in Eluru",
      description: "Discover trusted local function halls, photographers, catering services, decorators, and transportation providers in Eluru.",
      images: ["/logo.png"],
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased text-slate-800 bg-[#FCFAF6]">
        {children}
      </body>
    </html>
  );
}
