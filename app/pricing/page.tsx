import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CheckCircle2, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "One-Time",
    price: "$29",
    period: "per pickup",
    description: "Perfect for move-outs, renovations, or the occasional big haul.",
    cta: "Book a Pickup",
    href: "/register?plan=onetime",
    highlighted: false,
    features: [
      { text: "Up to 20 flattened boxes", included: true },
      { text: "Next-day availability", included: true },
      { text: "Recycling confirmation email", included: true },
      { text: "On-demand scheduling", included: true },
      { text: "Weekly recurring pickup", included: false },
      { text: "Priority time slots", included: false },
      { text: "Unlimited boxes", included: false },
    ],
  },
  {
    name: "Monthly",
    price: "$49",
    period: "/month",
    description: "Ideal for households and businesses with consistent cardboard output.",
    cta: "Start Subscription",
    href: "/register?plan=monthly",
    highlighted: true,
    badge: "Best Value",
    features: [
      { text: "Unlimited boxes per pickup", included: true },
      { text: "4 pickups per month (weekly)", included: true },
      { text: "Priority time slots", included: true },
      { text: "Recycling impact dashboard", included: true },
      { text: "SMS pickup reminders", included: true },
      { text: "Pause or cancel anytime", included: true },
      { text: "Dedicated account manager*", included: false },
    ],
  },
  {
    name: "Business",
    price: "Custom",
    period: "",
    description: "High-volume operations, warehouses, and multi-location businesses.",
    cta: "Contact Us",
    href: "mailto:hello@cardboardcaddie.com",
    highlighted: false,
    features: [
      { text: "Unlimited boxes", included: true },
      { text: "Flexible pickup frequency", included: true },
      { text: "Priority time slots", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom invoicing", included: true },
      { text: "API / webhook integration", included: true },
      { text: "On-site assessment", included: true },
    ],
  },
];

const faqs = [
  {
    q: "What counts as a 'box'?",
    a: "Any standard cardboard shipping box or packaging — including Amazon boxes, appliance boxes, and moving boxes. They must be flattened and left at your door or curb.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Yes. You can pause or cancel your Monthly plan at any time from your dashboard. No fees, no questions.",
  },
  {
    q: "What if I have more than 20 boxes on a one-time pickup?",
    a: "We'll still take them. We charge an additional $2 per box over the 20-box limit, billed after the pickup.",
  },
  {
    q: "Is there a minimum commitment for the monthly plan?",
    a: "Nope. Month-to-month, cancel whenever you like.",
  },
  {
    q: "How does recycling work?",
    a: "All collected cardboard is delivered to certified recycling centers. You'll receive an email summary showing the weight recycled and the environmental impact.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-stone-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-stone-500 max-w-xl mx-auto">
              No hidden fees. Pay for what you need, when you need it.
            </p>
          </div>

          {/* Plans */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlighted
                    ? "bg-brand-500 shadow-2xl shadow-brand-200 scale-[1.02]"
                    : "bg-white border border-stone-200 hover:shadow-lg transition-shadow"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand-600 text-xs font-bold px-4 py-1 rounded-full shadow border border-brand-100">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className={`text-sm font-bold uppercase tracking-widest mb-2 ${plan.highlighted ? "text-brand-200" : "text-stone-400"}`}>
                    {plan.name}
                  </div>
                  <div className={`text-5xl font-extrabold mb-1 ${plan.highlighted ? "text-white" : "text-stone-900"}`}>
                    {plan.price}
                    {plan.period && (
                      <span className={`text-xl font-semibold ${plan.highlighted ? "text-brand-200" : "text-stone-400"}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-8 leading-relaxed ${plan.highlighted ? "text-brand-100" : "text-stone-500"}`}>
                    {plan.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-3">
                        {f.included ? (
                          <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-brand-200" : "text-green-500"}`} />
                        ) : (
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-stone-300" />
                        )}
                        <span className={`text-sm ${f.included ? (plan.highlighted ? "text-white" : "text-stone-700") : "text-stone-400"}`}>
                          {f.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`mt-auto block text-center font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? "bg-white text-brand-600 hover:bg-brand-50"
                      : "bg-stone-900 text-white hover:bg-stone-700"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-stone-900 text-center mb-10">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.q} className="bg-stone-50 rounded-xl p-6 border border-stone-100">
                  <h3 className="font-semibold text-stone-900 mb-2">{faq.q}</h3>
                  <p className="text-stone-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 py-10 px-4 border-t border-stone-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-stone-400 font-semibold">
            Cardboard<span className="text-brand-400">Caddie</span>.com
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="/" className="hover:text-stone-300">Home</Link>
            <Link href="/login" className="hover:text-stone-300">Login</Link>
            <span>© {new Date().getFullYear()} CardboardCaddie</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
