import { prisma } from "@/lib/prisma";
import TestimonialsClientView from "./TestimonialsClientView";

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-playfair text-2xl font-bold text-white">
          Customer Testimonials & Moderation ({testimonials.length})
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Approve or hide reviews before they display on the public homepage.
        </p>
      </div>

      <TestimonialsClientView initialTestimonials={testimonials} />
    </div>
  );
}
