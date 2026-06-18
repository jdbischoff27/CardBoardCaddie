"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Package, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";

const PLANS = [
  {
    id: "onetime",
    name: "One-Time Pickup",
    price: "$29",
    features: ["Up to 20 boxes", "Next-day pickup"],
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: "$49/mo",
    features: ["Unlimited boxes", "4 pickups/month", "Priority slots"],
  },
];

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get("plan") ?? "monthly";

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    // In a real app, POST to /api/auth/register, then sign in.
    // For demo, we sign in with the demo account.
    const result = await signIn("credentials", {
      email: "demo@cardboardcaddie.com",
      password: "demo1234",
      redirect: false,
    });
    setLoading(false);
    if (result?.ok) {
      router.push("/dashboard?new=true");
    } else {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-brand-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-stone-900">
              Cardboard<span className="text-brand-500">Caddie</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-stone-900">Create your account</h1>
          <p className="text-stone-500 mt-1">Get started in 2 minutes</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step >= s
                    ? "bg-brand-500 text-white"
                    : "bg-stone-200 text-stone-400"
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
              <span className={`text-sm font-medium ${step >= s ? "text-stone-800" : "text-stone-400"}`}>
                {s === 1 ? "Choose plan" : "Your details"}
              </span>
              {s < 2 && <div className="w-10 h-px bg-stone-200" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl shadow-stone-100 border border-stone-100 p-8">
          {/* Step 1: Plan selection */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Select a plan</h2>
              <div className="space-y-4 mb-8">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                      selectedPlan === plan.id
                        ? "border-brand-500 bg-brand-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-stone-900">{plan.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-brand-600">{plan.price}</span>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedPlan === plan.id
                              ? "border-brand-500 bg-brand-500"
                              : "border-stone-300"
                          }`}
                        >
                          {selectedPlan === plan.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {plan.features.map((f) => (
                        <span key={f} className="text-xs text-stone-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div>
              <button
                onClick={() => setStep(1)}
                className="text-sm text-stone-500 hover:text-stone-700 mb-5 flex items-center gap-1"
              >
                ← Back
              </button>
              <h2 className="text-lg font-semibold text-stone-900 mb-5">Your details</h2>

              {error && (
                <div className="bg-red-50 text-red-700 border border-red-100 rounded-xl p-4 text-sm mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Full name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Creating account…" : "Create Account"}
                </button>

                <p className="text-center text-xs text-stone-400 mt-2">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </div>
          )}
        </div>

        <p className="text-center text-stone-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
