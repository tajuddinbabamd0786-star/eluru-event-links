"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Sparkles, Building2, AlertCircle } from "lucide-react";
import SafeImagePreview from "@/components/SafeImagePreview";

interface BusinessFormProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  initialData?: any;
}

export default function BusinessForm({ categories, initialData }: BusinessFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData?.id);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    teluguName: initialData?.teluguName || "",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    managerName: initialData?.managerName || "",
    phone: initialData?.phone || "",
    secondaryPhone: initialData?.secondaryPhone || "",
    location: initialData?.location || "Eluru",
    serviceArea: initialData?.serviceArea || "Eluru and surrounding areas",
    googleMapsUrl: initialData?.googleMapsUrl || "",
    websiteUrl: initialData?.websiteUrl || "",
    mainImage: initialData?.mainImage || "",
    gallery: initialData?.gallery ? (typeof initialData.gallery === "string" ? JSON.parse(initialData.gallery) : initialData.gallery) : [],
    description: initialData?.description || "",
    advantages: initialData?.advantages || "",
    seatingCapacity: initialData?.seatingCapacity || "",
    carParking: initialData?.carParking ?? false,
    parkingDetails: initialData?.parkingDetails || "",
    rooms: initialData?.rooms || "",
    busAccess: initialData?.busAccess || "",
    foodType: initialData?.foodType || "both",
    services: initialData?.services ? (typeof initialData.services === "string" ? JSON.parse(initialData.services) : initialData.services) : [],
    vehicleTypes: initialData?.vehicleTypes || "",
    vehicleCapacities: initialData?.vehicleCapacities || "",
    acType: initialData?.acType || "AC",
    sleeperAvailable: initialData?.sleeperAvailable ?? false,
    serviceType: initialData?.serviceType || "Private",
    isFeatured: initialData?.isFeatured ?? false,
    isActive: initialData?.isActive ?? true,
  });

  const [serviceInput, setServiceInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCategory = categories.find((c) => c.id === formData.categoryId);

  const handleAddService = () => {
    if (serviceInput.trim()) {
      setFormData({ ...formData, services: [...formData.services, serviceInput.trim()] });
      setServiceInput("");
    }
  };

  const handleRemoveService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_: any, i: number) => i !== index),
    });
  };

  const handleAddGalleryImage = () => {
    if (galleryInput.trim()) {
      setFormData({ ...formData, gallery: [...formData.gallery, galleryInput.trim()] });
      setGalleryInput("");
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      gallery: formData.gallery.filter((_: any, i: number) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/businesses/${initialData.id}` : "/api/admin/businesses";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save business record");

      router.push("/admin/businesses");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/businesses"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Businesses</span>
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Saving to Database..." : isEdit ? "Update Business" : "Create & Publish Business"}</span>
        </button>
      </div>

      {error && (
        <div className="bg-rose-950/80 border border-rose-500 text-rose-200 p-4 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Basic Business Details */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>Basic Information</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Business Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Venkatrama Kalyana Mandapamu"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Telugu / Local Language Name
            </label>
            <input
              type="text"
              value={formData.teluguName}
              onChange={(e) => setFormData({ ...formData, teluguName: e.target.value })}
              placeholder="e.g. వెంకట్రామ కళ్యాణ మండపము"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Service Category <span className="text-red-400">*</span>
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Manager / Owner Name
            </label>
            <input
              type="text"
              value={formData.managerName}
              onChange={(e) => setFormData({ ...formData, managerName: e.target.value })}
              placeholder="e.g. T. Tulasi Rao"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Primary Phone Number <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9440664181"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Secondary Contact Phone
            </label>
            <input
              type="text"
              value={formData.secondaryPhone}
              onChange={(e) => setFormData({ ...formData, secondaryPhone: e.target.value })}
              placeholder="e.g. 8074228600"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location City</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Eluru"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Service Area Coverage</label>
            <input
              type="text"
              value={formData.serviceArea}
              onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
              placeholder="Eluru and surrounding areas"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Google Maps Direction URL</label>
            <input
              type="url"
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              placeholder="https://maps.app.goo.gl/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Website URL</label>
            <input
              type="url"
              value={formData.websiteUrl}
              onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe history, facilities, suitability for weddings or celebrations..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Key Advantages & Highlights</label>
          <textarea
            rows={2}
            value={formData.advantages}
            onChange={(e) => setFormData({ ...formData, advantages: e.target.value })}
            placeholder="e.g. Central road connectivity, spacious dining hall, generator backup..."
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Category Specific Fields (Function Halls, Catering, Transportation, etc.) */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center justify-between">
          <span>Category Specifications ({selectedCategory?.name})</span>
          <span className="text-[10px] text-amber-400 font-normal">Fields adapt dynamically</span>
        </h3>

        {/* Function Halls Specific Fields */}
        {selectedCategory?.slug === "function-halls" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seating Capacity</label>
              <input
                type="text"
                value={formData.seatingCapacity}
                onChange={(e) => setFormData({ ...formData, seatingCapacity: e.target.value })}
                placeholder="e.g. 400–500"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Guest / AC Rooms</label>
              <input
                type="text"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                placeholder="e.g. 4 AC rooms and 4 non-AC rooms"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Road / Bus Accessibility</label>
              <input
                type="text"
                value={formData.busAccess}
                onChange={(e) => setFormData({ ...formData, busAccess: e.target.value })}
                placeholder="e.g. Bus allowed on the road"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="carParking"
                checked={formData.carParking}
                onChange={(e) => setFormData({ ...formData, carParking: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="carParking" className="text-xs font-semibold text-white">
                Car Parking Available
              </label>
            </div>
          </div>
        )}

        {/* Catering Specific Fields */}
        {selectedCategory?.slug === "catering" && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Food Offering</label>
            <select
              value={formData.foodType}
              onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none max-w-sm"
            >
              <option value="vegetarian">Vegetarian Only</option>
              <option value="non-vegetarian">Non-Vegetarian Only</option>
              <option value="both">Both Vegetarian and Non-Vegetarian</option>
            </select>
          </div>
        )}

        {/* Transportation Specific Fields */}
        {selectedCategory?.slug === "transportation" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Vehicle Types</label>
              <input
                type="text"
                value={formData.vehicleTypes}
                onChange={(e) => setFormData({ ...formData, vehicleTypes: e.target.value })}
                placeholder="e.g. AC cars and small buses"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seating Capacities</label>
              <input
                type="text"
                value={formData.vehicleCapacities}
                onChange={(e) => setFormData({ ...formData, vehicleCapacities: e.target.value })}
                placeholder="e.g. 4+1, 6+1, 12+1, 24, 40"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">AC Option</label>
              <select
                value={formData.acType}
                onChange={(e) => setFormData({ ...formData, acType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
                <option value="Both">Both AC and Non-AC</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Service Ownership</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Private">Private Travels</option>
                <option value="Government bus only">Government Bus (APSRTC)</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="sleeperAvailable"
                checked={formData.sleeperAvailable}
                onChange={(e) => setFormData({ ...formData, sleeperAvailable: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
              />
              <label htmlFor="sleeperAvailable" className="text-xs font-semibold text-white">
                Sleeper Buses Available
              </label>
            </div>
          </div>
        )}

        {/* Services Multi-Tags (Photos, Videos, Drone, Flower decoration, etc.) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Specific Services List</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              placeholder="e.g. Drone Coverage, Candid Photos, Stage Flower Decor..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddService}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
            >
              Add Service
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((srv: string, idx: number) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 text-xs flex items-center gap-1.5"
              >
                <span>{srv}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(idx)}
                  className="text-slate-500 hover:text-red-400 font-bold ml-1"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Media & Images Management */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-playfair text-lg font-bold text-white border-b border-slate-800 pb-3">
          Media & Image URLs
        </h3>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Main Cover Image URL
          </label>
          <input
            type="url"
            value={formData.mainImage}
            onChange={(e) => setFormData({ ...formData, mainImage: e.target.value })}
            placeholder="https://images.unsplash.com/... or edgeone / cdn URL"
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
          {formData.mainImage && formData.mainImage.trim() && (
            <div className="mt-2 space-y-1">
              <span className="text-[10px] text-slate-400 font-medium">Cover Image Preview:</span>
              <div className="relative w-44 h-28 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-md">
                <SafeImagePreview
                  src={formData.mainImage}
                  alt="Main Cover Preview"
                  fallbackText="Invalid URL or unable to load image"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Gallery Image URLs</label>
          <div className="flex gap-2 mb-2">
            <input
              type="url"
              value={galleryInput}
              onChange={(e) => setGalleryInput(e.target.value)}
              placeholder="Paste additional photo URL..."
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddGalleryImage}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
            >
              Add Photo
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {formData.gallery.map((url: string, idx: number) => (
              <div key={idx} className="relative group h-24 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-sm">
                <SafeImagePreview
                  src={url}
                  alt={`Gallery ${idx + 1}`}
                  fallbackText="Broken Image"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGalleryImage(idx)}
                  className="absolute top-1 right-1 bg-black/80 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-md"
                  title="Remove Image"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publication Controls */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
            />
            <span className="text-xs font-bold text-white">Active Listing (Visible on Public Site)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
            />
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured on Homepage</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:opacity-95 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Saving..." : isEdit ? "Save Changes" : "Create Business Listing"}</span>
        </button>
      </div>
    </form>
  );
}
