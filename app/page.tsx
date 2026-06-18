import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  CalendarDays,
  Truck,
  Recycle,
  CheckCircle2,
  ArrowRight,
  Star,
  Leaf,
} from "lucide-react";

const steps = [
  {
    icon: CalendarDays,
    title: "Book a Pickup",
    description:
      "Choose a date and time that works for you. One-time or recurring — it's your call.",
  },
  {
    icon: Truck,
    title: "We Come to You",
    description:
      "Leave your flattened boxes outside. Our team arrives in the scheduled window and hauls everything away.",
  },
  {
    icon: Recycle,
    title: "We Recycle It Right",
    description:
      "All cardboard is taken to certified recycling facilities. Zero landfill, full peace of mind.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Small business owner",
    text: "We get so many deliveries every week. Cardboard Caddie's monthly plan has been a game-changer — I never think about cardboard anymore.",
    stars: 5,
  },
  {
    name: "James T.",
    role: "Homeowner",
    text: "Just moved into a new place and had mountains of boxes. Booked a one-time pickup and they were gone the next day. Super easy.",
    stars: 5,
  },
  {
    name: "Linda R.",
    role: "Office manager",
    text: "We switched from paying for a dumpster to a Cardboard Caddie subscription and cut our waste costs significantly.",
    stars: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-stone-50 via-brand-50 to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            100% recycled. Zero landfill.
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-stone-900 leading-tight tracking-tight text-balance mb-6">
            Cardboard pickup,{" "}
            <span className="text-brand-500">done right.</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Schedule a one-time or recurring pickup of your cardboard boxes.
            We haul, we recycle — you relax.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5"
            >
              Schedule a Pickup
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-lg px-8 py-4 rounded-xl border border-stone-200 transition-all hover:-translate-y-0.5"
            >
              View Pricing
            </Link>
          </div>
          {/* Social proof */}
          <p className="mt-8 text-sm text-stone-500">
            ⭐⭐⭐⭐⭐ &nbsp; Trusted by <strong>1,200+</strong> homes &amp; businesses
          </p>
        </div>

        {/* Hero visual */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-100 to-brand-200 h-72 flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="flex gap-6 justify-center mb-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-20 h-24 bg-brand-400/80 rounded-lg border-2 border-brand-500 shadow-md flex items-end justify-center pb-2"
                    style={{ transform: `rotate(${(i - 2) * 4}deg)` }}
                  >
                    <div className="w-12 h-1 bg-brand-600/60 rounded" />
                  </div>
                ))}
              </div>
              <p className="text-brand-700 font-semibold text-sm">Your boxes. Our problem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">How it works</h2>
            <p className="text-lg text-stone-500">Three steps to a clutter-free space.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="bg-stone-50 hover:bg-brand-50 rounded-2xl p-8 transition-colors h-full border border-stone-100 hover:border-brand-200">
                  <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center mb-5">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-xs font-bold text-brand-400 uppercase tracking-widest mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-600 leading-relaxed">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-stone-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans preview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">Simple pricing</h2>
            <p className="text-lg text-stone-500">One-time or subscribe and save.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* One-time */}
            <div className="bg-white rounded-2xl border border-stone-200 p-8 hover:shadow-lg transition-shadow">
              <div className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">One-Time</div>
              <div className="text-4xl font-extrabold text-stone-900 mb-1">
                $29
              </div>
              <div className="text-stone-500 text-sm mb-6">per pickup</div>
              <ul className="space-y-3 mb-8">
                {["Up to 20 boxes", "Next-day availability", "Recycling confirmation email"].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-stone-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register?plan=onetime"
                className="block text-center bg-stone-900 hover:bg-stone-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Book Now
              </Link>
            </div>

            {/* Monthly */}
            <div className="bg-brand-500 rounded-2xl p-8 relative overflow-hidden shadow-xl shadow-brand-200 hover:shadow-brand-300 transition-shadow">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="text-sm font-semibold text-brand-200 uppercase tracking-wide mb-2">Monthly</div>
              <div className="text-4xl font-extrabold text-white mb-1">
                $49
                <span className="text-xl font-semibold text-brand-200">/mo</span>
              </div>
              <div className="text-brand-200 text-sm mb-6">4 pickups per month</div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited boxes per pickup",
                  "Weekly scheduled pickups",
                  "Priority time slots",
                  "Cancel anytime",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-white">
                    <CheckCircle2 className="w-5 h-5 text-brand-200 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register?plan=monthly"
                className="block text-center bg-white hover:bg-brand-50 text-brand-600 font-semibold py-3 rounded-xl transition-colors"
              >
                Start Subscription
              </Link>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing" className="text-brand-600 font-medium hover:underline">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-stone-900 mb-4">People love it</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand-400 text-brand-400" />
                  ))}
                </div>
                <p className="text-stone-700 mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-stone-900">{t.name}</div>
                  <div className="text-sm text-stone-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-stone-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to ditch the cardboard?
          </h2>
          <p className="text-stone-400 text-lg mb-8">
            Sign up in 2 minutes. First pickup as soon as tomorrow.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 border-t border-stone-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-stone-400 font-semibold">
            Cardboard<span className="text-brand-400">Caddie</span>.com
          </div>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="/pricing" className="hover:text-stone-300 transition-colors">Pricing</Link>
            <Link href="/login" className="hover:text-stone-300 transition-colors">Login</Link>
            <span>© {new Date().getFullYear()} CardboardCaddie. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
