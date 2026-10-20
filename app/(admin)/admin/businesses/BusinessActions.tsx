"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit3, Trash2, Copy, Sparkles, CheckCircle2, XCircle } from "lucide-react";

interface BusinessActionsProps {
  business: {
    id: string;
    name: string;
    isActive: boolean;
    isFeatured: boolean;
  };
}

export default function BusinessActions({ business }: BusinessActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggleActive = async () => {
    setLoading(true);
    await fetch(`/api/admin/businesses/${business.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !business.isActive }),
    });
    setLoading(false);
    router.refresh();
  };

  const handleToggleFeatured = async () => {
    setLoading(true);
    await fetch(`/api/admin/businesses/${business.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFeatured: !business.isFeatured }),
    });
    setLoading(false);
    router.refresh();
  };

  const handleDuplicate = async () => {
    if (!confirm(`Duplicate "${business.name}"? A new copy will be created.`)) return;
    setLoading(true);
    await fetch(`/api/admin/businesses/${business.id}/duplicate`, {
      method: "POST",
    });
    setLoading(false);
    router.refresh();
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to permanently delete "${business.name}"?`)) return;
    setLoading(true);
    await fetch(`/api/admin/businesses/${business.id}`, {
      method: "DELETE",
    });
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      {/* Toggle Featured */}
      <button
        onClick={handleToggleFeatured}
        disabled={loading}
        title={business.isFeatured ? "Unfeature" : "Mark as Featured"}
        className={`p-1.5 rounded-lg border transition-colors ${
          business.isFeatured
            ? "bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30"
            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-amber-400"
        }`}
      >
        <Sparkles className="w-3.5 h-3.5" />
      </button>

      {/* Toggle Active/Inactive */}
      <button
        onClick={handleToggleActive}
        disabled={loading}
        title={business.isActive ? "Deactivate" : "Activate"}
        className={`p-1.5 rounded-lg border transition-colors ${
          business.isActive
            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30"
            : "bg-rose-500/20 text-rose-300 border-rose-500/40 hover:bg-rose-500/30"
        }`}
      >
        {business.isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
      </button>

      {/* Duplicate */}
      <button
        onClick={handleDuplicate}
        disabled={loading}
        title="Duplicate Listing"
        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 hover:text-white transition-colors"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>

      {/* Edit */}
      <Link
        href={`/admin/businesses/${business.id}`}
        title="Edit Full Business"
        className="p-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 hover:text-amber-400 transition-colors"
      >
        <Edit3 className="w-3.5 h-3.5" />
      </Link>

      {/* Delete */}
      <button
        onClick={handleDelete}
        disabled={loading}
        title="Delete Permanently"
        className="p-1.5 rounded-lg bg-slate-900 text-rose-400 border border-slate-800 hover:bg-rose-950/40 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
