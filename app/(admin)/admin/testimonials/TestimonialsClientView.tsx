"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, CheckCircle, XCircle, Trash2, Plus } from "lucide-react";

export default function TestimonialsClientView({ initialTestimonials }: { initialTestimonials: any[] }) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    eventType: "",
    reviewText: "",
    rating: 5,
    isActive: true,
  });

  const handleToggle = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !currentStatus }),
    });
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial permanently?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    router.refresh();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowAdd(false);
    setForm({ customerName: "", eventType: "", reviewText: "", rating: 5, isActive: true });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{showAdd ? "Close Form" : "Add Testimonial"}</span>
        </button>
      </div>

      {showAdd && (
        <form onSubmit={handleCreate} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 max-w-xl">
          <h3 className="font-playfair font-bold text-white text-base">Add New Testimonial</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Customer / Family Name</label>
            <input
              type="text"
              required
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Event Type</label>
            <input
              type="text"
              value={form.eventType}
              onChange={(e) => setForm({ ...form, eventType: e.target.value })}
              placeholder="e.g. Wedding Reception at Venkatrama Mandapamu"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Feedback & Review</label>
            <textarea
              required
              rows={3}
              value={form.reviewText}
              onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
          >
            Save & Publish Testimonial
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {initialTestimonials.map((t) => (
          <div key={t.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-white text-sm">{t.customerName}</h4>
                {t.eventType && <p className="text-xs text-amber-400">{t.eventType}</p>}
              </div>
              <button
                onClick={() => handleToggle(t.id, t.isActive)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  t.isActive ? "bg-emerald-500/20 text-emerald-300" : "bg-slate-800 text-slate-400"
                }`}
              >
                {t.isActive ? "APPROVED & LIVE" : "HIDDEN / PENDING"}
              </button>
            </div>

            <p className="text-xs text-slate-300 italic">&ldquo;{t.reviewText}&rdquo;</p>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <button onClick={() => handleDelete(t.id)} className="text-rose-400 hover:text-rose-300 text-xs">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
