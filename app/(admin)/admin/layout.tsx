import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Building2, 
  Calendar, 
  Inbox, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  PlusCircle,
  Camera,
  UtensilsCrossed,
  Sparkles,
  Bus
} from "lucide-react";
import AdminSignOutButton from "./SignOutButton";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // If not logged in or not admin, redirect to admin login
  if (!session || !session.user || (session.user as any).role !== "admin") {
    redirect("/admin/login");
  }

  const navItems = [
    { name: "Dashboard Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "All Businesses", href: "/admin/businesses", icon: <Building2 className="w-4 h-4" /> },
    { name: "Function Halls", href: "/admin/businesses?category=function-halls", icon: <Building2 className="w-4 h-4" /> },
    { name: "Photography", href: "/admin/businesses?category=photography", icon: <Camera className="w-4 h-4" /> },
    { name: "Catering Services", href: "/admin/businesses?category=catering", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { name: "Decoration", href: "/admin/businesses?category=decoration", icon: <Sparkles className="w-4 h-4" /> },
    { name: "Transportation", href: "/admin/businesses?category=transportation", icon: <Bus className="w-4 h-4" /> },
    { name: "Slots & Availability", href: "/admin/slots", icon: <Calendar className="w-4 h-4" /> },
    { name: "Customer Enquiries", href: "/admin/enquiries", icon: <Inbox className="w-4 h-4" /> },
    { name: "Testimonials", href: "/admin/testimonials", icon: <MessageSquare className="w-4 h-4" /> },
    { name: "Website Settings", href: "/admin/settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex">
        <div>
          {/* Logo & Header */}
          <div className="p-5 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 relative rounded-full overflow-hidden border border-amber-400 bg-white">
              <Image src="/logo.png" alt="Eluru Event Links" fill className="object-contain p-0.5" />
            </div>
            <div>
              <h2 className="font-playfair text-sm font-bold text-white tracking-wide">ELURU EVENT LINKS</h2>
              <span className="text-[10px] text-amber-400 uppercase font-semibold">Admin Panel</span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="p-3 space-y-1">
            <Link
              href="/admin/businesses/new"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs mb-3 shadow-md hover:opacity-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>+ Add New Business</span>
            </Link>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-slate-400 hover:text-amber-400 py-1"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <div className="pt-2">
            <AdminSignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-950/70 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 md:hidden">
            <div className="w-8 h-8 relative rounded-full overflow-hidden border border-amber-400 bg-white">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="font-playfair font-bold text-sm text-white">Admin Console</span>
          </div>

          <div className="hidden md:block">
            <span className="text-xs text-slate-400">
              Welcome, <strong className="text-white">{session.user?.email}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/businesses/new"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Listing</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
