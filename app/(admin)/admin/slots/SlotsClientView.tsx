"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Plus, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";

interface SlotsClientViewProps {
  businesses: Array<{ id: string; name: string; location: string }>;
  initialSlots: any[];
}

export default function SlotsClientView({ businesses, initialSlots }: SlotsClientViewProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    businessId: businesses[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "14:00",
    status: "AVAILABLE",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create slot");

      setForm({
        ...form,
        notes: "",
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm("Are you sure you want to remove this slot?")) return;
    await fetch(`/api/admin/slots/${slotId}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Create New Slot */}
      <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>Add Availability Slot</span>
        </h3>

        {error && (
          <div className="bg-rose-950/80 border border-rose-500 text-rose-200 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleCreateSlot} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Select Function Hall
            </label>
            <select
              value={form.businessId}
              onChange={(e) => setForm({ ...form, businessId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {businesses.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
              <input
                type="time"
                required
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
              <input
                type="time"
                required
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="AVAILABLE">AVAILABLE (Open for booking)</option>
              <option value="BOOKED">BOOKED (Confirmed reservation)</option>
              <option value="BLOCKED">BLOCKED (Maintenance / Private)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Internal Notes / Shift Info
            </label>
            <input
              type="text"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="e.g. Morning Muhurtham slot reserved"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>{loading ? "Checking Conflicts & Saving..." : "Add Slot"}</span>
          </button>
        </form>
      </div>

      {/* Slots Table */}
      <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-playfair text-lg font-bold text-white">Configured Availability Records</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Hall Name</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Status</th>
                <th className="p-3">Notes</th>
                <th className="p-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {initialSlots.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    No availability slots created yet. Add one using the form.
                  </td>
                </tr>
              ) : (
                initialSlots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-semibold text-white truncate max-w-[160px]">
                      {slot.business?.name}
                    </td>
                    <td className="p-3 space-y-0.5">
                      <p className="text-white font-medium">{slot.date}</p>
                      <p className="text-[11px] text-slate-400">
                        {slot.startTime} - {slot.endTime}
                      </p>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          slot.status === "AVAILABLE"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : slot.status === "BOOKED"
                            ? "bg-rose-500/20 text-rose-300"
                            : "bg-slate-700 text-slate-300"
                        }`}
                      >
                        {slot.status}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 truncate max-w-[140px]">
                      {slot.notes || "—"}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="p-1 rounded hover:bg-rose-950/40 text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
