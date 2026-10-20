"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, Mail, Calendar, MessageSquare, Clock, CheckCircle2 } from "lucide-react";
import { formatTelUrl, formatWhatsAppUrl } from "@/lib/utils";

export default function EnquiriesClientView({ initialEnquiries }: { initialEnquiries: any[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const statuses = ["NEW", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

  const filtered = initialEnquiries.filter((enq) => {
    if (filter === "ALL") return true;
    return enq.status === filter;
  });

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    setLoadingId(id);
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setLoadingId(null);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("ALL")}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
            filter === "ALL" ? "bg-amber-500 text-slate-950" : "bg-slate-950 text-slate-400 hover:text-white"
          }`}
        >
          All ({initialEnquiries.length})
        </button>
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
              filter === st ? "bg-amber-500 text-slate-950" : "bg-slate-950 text-slate-400 hover:text-white"
            }`}
          >
            {st} ({initialEnquiries.filter((e) => e.status === st).length})
          </button>
        ))}
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-2 bg-slate-950 p-12 text-center rounded-2xl border border-slate-800 text-slate-500 text-xs">
            No enquiries match this status filter.
          </div>
        ) : (
          filtered.map((enq) => (
            <div
              key={enq.id}
              className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-base">{enq.customerName}</h3>
                    <p className="text-xs text-slate-400">
                      Received: {new Date(enq.createdAt).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <select
                    disabled={loadingId === enq.id}
                    value={enq.status}
                    onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900 border border-slate-700 text-amber-300 focus:outline-none"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Business */}
                {enq.business && (
                  <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400">Target Business: </span>
                    <span className="font-semibold text-amber-400">{enq.business.name}</span>
                  </div>
                )}

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  {enq.eventDate && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Date: {enq.eventDate}</span>
                    </div>
                  )}
                  {enq.preferredSlot && (
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Shift: {enq.preferredSlot}</span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/60 text-xs text-slate-300 italic whitespace-pre-wrap">
                  &ldquo;{enq.message}&rdquo;
                </div>
              </div>

              {/* Action Contact Links */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={formatTelUrl(enq.phone)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call ({enq.phone})</span>
                  </a>
                  <a
                    href={formatWhatsAppUrl(
                      enq.phone,
                      `Hello ${enq.customerName}, this is regarding your event enquiry on Eluru Event Links.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>

                {enq.email && (
                  <a
                    href={`mailto:${enq.email}`}
                    className="text-slate-400 hover:text-white text-xs underline truncate max-w-[150px]"
                  >
                    {enq.email}
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
