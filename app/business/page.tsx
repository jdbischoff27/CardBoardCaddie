"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  CalendarCheck,
  Infinity,
  ReceiptText,
  MapPin,
  ShoppingBag,
  Warehouse,
  Building2,
  Truck,
  Sofa,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";

const benefits = [
  {
    icon: CalendarCheck,
    title: "Scheduled Pickups",
    description:
      "Weekly or bi-weekly service on a fixed schedule. Set it once and never think about cardboard again.",
  },
  {
    icon: Infinity,
    title: "Unlimited Volume",
    description:
      "No box limits, no overages, no surprises. Bring out as much as you have — we take it all.",
  },
  {
    icon: ReceiptText,
    title: "Simple Invoicing",
    description:
      "One monthly invoice with clear line items. Easy for your accounting team to process and file.",
  },
  {
    icon: MapPin,
    title: "Local & Reliable",
    description:
      "Northern Utah based and operated. When you call, you reach someone who knows your city by name.",
  },
];

const industries = [
  { icon: ShoppingBag, label: "Retail stores" },
  { icon: Warehouse, label: "E-commerce warehouses" },
  { icon: Building2, label: "Office buildings" },
  { icon: Truck, label: "Moving companies" },
  { icon: Sofa, label: "Furniture stores" },
  { icon: ShoppingCart, label: "Grocery & food service" },
];

const planFeatures = [
  "Unlimited boxes per pickup",
  "Weekly pickups",
  "Dedicated account manager",
  "Custom invoicing",
  "Priority scheduling",
];

interface FormState {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  weeklyBoxes: string;
  notes: string;
}

const emptyForm: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  city: "",
  weeklyBoxes: "",
  notes: "",
};

export default function BusinessPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 via-brand-50 to-brand-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Building2 className="w-4 h-4" />
            Business Services
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-stone-900 leading-tight tracking-tight text-balance mb-6">
            Cardboard Removal for{" "}
            <span className="text-brand-500">Northern Utah Businesses</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Scheduled, reliable cardboard pickup for offices, warehouses, retailers, and
            e-commerce operations across the Wasatch Front.
          </p>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5"
          >
            Get a Custom Quote
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Why businesses choose us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">
              Why businesses choose us
            </h2>
            <p className="text-lg text-stone-500">
              Built for operations that need consistency, not surprises.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="bg-stone-50 hover:bg-brand-50 border border-stone-100 hover:border-brand-200 rounded-2xl p-7 transition-colors"
              >
                <div className="w-11 h-11 bg-brand-500 rounded-xl flex items-center justify-center mb-5">
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">{b.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Who we serve</h2>
            <p className="text-lg text-stone-500">
              Any operation that generates cardboard — we handle it.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col items-center gap-3 text-center"
              >
                <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center">
                  <ind.icon className="w-6 h-6 text-brand-600" />
                </div>
                <span className="font-semibold text-stone-800">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Business pricing</h2>
          <p className="text-lg text-stone-500 mb-12">
            Custom plans built around your volume and schedule.
          </p>
          <div className="bg-brand-500 rounded-2xl p-10 text-left shadow-xl shadow-brand-200 relative overflow-hidden">
            <div className="absolute top-5 right-5 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              BUSINESS
            </div>
            <div className="text-sm font-semibold text-brand-200 uppercase tracking-wide mb-2">
              Custom Pricing
            </div>
            <div className="text-5xl font-extrabold text-white mb-1">
              From $149
              <span className="text-2xl font-semibold text-brand-200">/mo</span>
            </div>
            <div className="text-brand-200 text-sm mb-8">
              Based on pickup frequency and volume
            </div>
            <ul className="space-y-3 mb-10">
              {planFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3 text-white">
                  <CheckCircle2 className="w-5 h-5 text-brand-200 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-50 text-brand-700 font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Fill out the quote form below
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Request a Quote</h2>
            <p className="text-lg text-stone-500">
              Tell us about your business and we&rsquo;ll be in touch within one business day.
            </p>
          </div>

          {submitted ? (
            <div className="bg-brand-50 border border-brand-200 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-3">
                Thanks, we&rsquo;ll be in touch!
              </h3>
              <p className="text-stone-600 mb-6">
                We received your request and will follow up within one business day with a
                custom quote for your operation.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:underline"
              >
                &larr; Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-stone-200 p-8 shadow-sm space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Business name <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    required
                    placeholder="Acme Supply Co."
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Contact name <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    required
                    placeholder="Jane Smith"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Email <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="jane@acmesupply.com"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Phone <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="(801) 555-0100"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    City <span className="text-brand-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Salt Lake City"
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                    Estimated weekly boxes <span className="text-brand-500">*</span>
                  </label>
                  <select
                    name="weeklyBoxes"
                    value={form.weeklyBoxes}
                    onChange={handleChange}
                    required
                    className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition bg-white"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    <option value="under-50">Under 50</option>
                    <option value="50-200">50–200</option>
                    <option value="200-500">200–500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                  Notes <span className="text-stone-400 font-normal">(optional)</span>
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us anything helpful — pickup location access, special requirements, current waste situation..."
                  className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-brand-200"
              >
                Request a Quote
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-stone-400 font-semibold">
            Cardboard<span className="text-brand-400">Caddie</span> &mdash; Northern Utah
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="/pricing" className="hover:text-stone-300 transition-colors">Pricing</Link>
            <Link href="/business" className="hover:text-stone-300 transition-colors">For Business</Link>
            <Link href="/login" className="hover:text-stone-300 transition-colors">Login</Link>
            <span>&copy; {new Date().getFullYear()} CardboardCaddie. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
