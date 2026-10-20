import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { 
  Building2, 
  Calendar, 
  Inbox, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  Phone,
  Eye
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalBusinesses,
    activeBusinesses,
    featuredBusinesses,
    categoryCounts,
    totalEnquiries,
    newEnquiries,
    totalSlots,
    bookedSlots,
    recentEnquiries,
    recentBusinesses
  ] = await Promise.all([
    prisma.business.count(),
    prisma.business.count({ where: { isActive: true } }),
    prisma.business.count({ where: { isFeatured: true } }),
    prisma.category.findMany({
      include: {
        _count: { select: { businesses: true } },
      },
    }),
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.slot.count(),
    prisma.slot.count({ where: { status: "BOOKED" } }),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { business: true },
    }),
    prisma.business.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
          Overview Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time metrics, live business counts, and customer booking enquiries in Eluru.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Total Businesses</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalBusinesses}</p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{activeBusinesses} Active / {featuredBusinesses} Featured</span>
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Customer Enquiries</span>
            <Inbox className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalEnquiries}</p>
          <p className="text-[11px] text-amber-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{newEnquiries} Pending Action</span>
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Availability Slots</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{totalSlots}</p>
          <p className="text-[11px] text-slate-400">
            {bookedSlots} Booked / {totalSlots - bookedSlots} Open
          </p>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase">Service Categories</span>
            <Sparkles className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-3xl font-extrabold text-white">{categoryCounts.length}</p>
          <p className="text-[11px] text-slate-400">Across 5 main event sectors</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
        <h3 className="font-playfair text-lg font-bold text-white mb-4">
          Listings Distribution by Category
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categoryCounts.map((cat) => (
            <Link
              key={cat.id}
              href={`/admin/businesses?category=${cat.slug}`}
              className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800/80 transition-colors"
            >
              <p className="text-xs text-slate-400 truncate">{cat.name}</p>
              <p className="text-xl font-bold text-amber-400 mt-1">{cat._count.businesses}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Enquiries & Businesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-white">Recent Customer Enquiries</h3>
            <Link href="/admin/enquiries" className="text-xs text-amber-400 hover:underline">
              View All &rarr;
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No enquiries submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{enq.customerName}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      enq.status === 'NEW' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-slate-400">Phone: {enq.phone}</p>
                  {enq.business && (
                    <p className="text-amber-400/90 font-medium truncate">For: {enq.business.name}</p>
                  )}
                  <p className="text-slate-500 line-clamp-1 italic">&ldquo;{enq.message}&rdquo;</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Added Businesses */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-playfair text-lg font-bold text-white">Businesses in Directory</h3>
            <Link href="/admin/businesses" className="text-xs text-amber-400 hover:underline">
              Manage All &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentBusinesses.map((b) => (
              <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{b.name}</h4>
                  <p className="text-slate-400">{b.category.name} &bull; {b.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    b.isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {b.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <Link
                    href={`/admin/businesses/${b.id}`}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
