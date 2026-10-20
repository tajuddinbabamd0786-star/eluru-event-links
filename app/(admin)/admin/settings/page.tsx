import { prisma } from "@/lib/prisma";
import SettingsClientView from "./SettingsClientView";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">
          Website Settings & Contact Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Update the central WhatsApp number, public primary phone, email, hero texts, and branding across the entire site without code changes.
        </p>
      </div>

      <SettingsClientView initialSettings={settings} />
    </div>
  );
}
