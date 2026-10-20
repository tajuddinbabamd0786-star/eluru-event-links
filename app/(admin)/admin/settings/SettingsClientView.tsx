"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, CheckCircle2, AlertCircle, Phone, MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export default function SettingsClientView({ initialSettings }: { initialSettings: any }) {
  const router = useRouter();
  const [form, setForm] = useState({
    websiteName: initialSettings?.websiteName || "ELURU EVENT LINKS",
    teluguTagline: initialSettings?.teluguTagline || "ఒక్క క్లిక్‌తో.. పెళ్లి పనులు సులువుగా!",
    founderName: initialSettings?.founderName || "T. Ganesh Gowtham",
    publicEmail: initialSettings?.publicEmail || "Elurueventlinks@gmail.com",
    primaryPhone: initialSettings?.primaryPhone || "+91 99495 31668",
    whatsappNumber: initialSettings?.whatsappNumber || "+91 9603921666",
    instagramUrl: initialSettings?.instagramUrl || "https://www.instagram.com/eluru_event_links?stkn=cGE5cXgzazlkYzNu",
    address: initialSettings?.address || "Eluru, Andhra Pradesh, India",
    heroHeading: initialSettings?.heroHeading || "Plan Your Perfect Event in Eluru",
    heroDescription: initialSettings?.heroDescription || "Discover trusted local function halls, photographers, catering services, decorators, and transportation providers—all in one place.",
    heroImage: initialSettings?.heroImage || "https://media.base44.com/images/public/6aa2b93fe166d1acb5a7457c/d6f0f2a1e_Screenshot2026-09-10135914.png",
    footerText: initialSettings?.footerText || "",
  });

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save settings");

      setSaved(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      {saved && (
        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-200 p-4 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>Website settings updated successfully! All public buttons and footers now reflect these values.</span>
        </div>
      )}

      {error && (
        <div className="bg-rose-950/80 border border-rose-500 text-rose-200 p-4 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Central Contact & Social Settings */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Phone className="w-5 h-5 text-amber-400" />
          <span>Central Contact & Social Links</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Central WhatsApp Number (Controls all WhatsApp buttons) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Public Primary Contact Phone <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={form.primaryPhone}
              onChange={(e) => setForm({ ...form, primaryPhone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Public Contact Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              required
              value={form.publicEmail}
              onChange={(e) => setForm({ ...form, publicEmail: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Founder Full Name</label>
            <input
              type="text"
              value={form.founderName}
              onChange={(e) => setForm({ ...form, founderName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Official Instagram Link</label>
            <input
              type="url"
              value={form.instagramUrl}
              onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1">Physical Office Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Homepage & Branding Settings */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3">
          Homepage Content & Brand Copy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Website Brand Name</label>
            <input
              type="text"
              value={form.websiteName}
              onChange={(e) => setForm({ ...form, websiteName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Telugu Tagline Banner</label>
            <input
              type="text"
              value={form.teluguTagline}
              onChange={(e) => setForm({ ...form, teluguTagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Main Heading</label>
          <input
            type="text"
            value={form.heroHeading}
            onChange={(e) => setForm({ ...form, heroHeading: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Supporting Description</label>
          <textarea
            rows={2}
            value={form.heroDescription}
            onChange={(e) => setForm({ ...form, heroDescription: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Showcase Image URL</label>
          <input
            type="url"
            value={form.heroImage}
            onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Custom Footer Copyright Text</label>
          <input
            type="text"
            value={form.footerText}
            onChange={(e) => setForm({ ...form, footerText: e.target.value })}
            placeholder="Leave empty for default copyright..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Persisting Changes..." : "Save Website Settings"}</span>
        </button>
      </div>
    </form>
  );
}
