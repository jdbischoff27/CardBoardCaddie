"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  Recycle,
  TrendingUp,
  Plus,
  CheckCircle2,
  Clock,
  ChevronRight,
  LogOut,
  CreditCard,
  Leaf,
} from "lucide-react";

const MOCK_PICKUPS = [
  { id: 1, date: "Jun 25, 2026", status: "scheduled", boxes: 12, address: "123 Main St" },
  { id: 2, date: "Jun 18, 2026", status: "completed", boxes: 8, address: "123 Main St" },
  { id: 3, date: "Jun 11, 2026", status: "completed", boxes: 15, address: "123 Main St" },
  { id: 4, date: "Jun 4, 2026", status: "completed", boxes: 7, address: "123 Main St" },
];

const STATS = [
  { label: "Total Pickups", value: "4", icon: Package, color: "bg-brand-100 text-brand-600" },
  { label: "Boxes Recycled", value: "42", icon: Recycle, color: "bg-green-100 text-green-600" },
  { label: "CO₂ Saved (lbs)", value: "63", icon: Leaf, color: "bg-emerald-100 text-emerald-600" },
  { label: "Next Pickup", value: "Jun 25", icon: CalendarDays, color: "bg-blue-100 text-blue-600" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "scheduled") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
        <Clock className="w-3 h-3" />
        Scheduled
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
      <CheckCircle2 className="w-3 h-3" />
      Completed
    </span>
  );
}

function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-stone-900">
              Cardboard<span className="text-brand-500">Caddie</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-200 flex items-center justify-center">
                <span className="text-sm font-bold text-brand-700">
                  {session.user?.name?.[0] ?? "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-stone-700">{session.user?.name}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome banner */}
        {isNew && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Welcome to Cardboard Caddie!</p>
              <p className="text-sm text-green-600">Your account is ready. Schedule your first pickup below.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">
              Good morning, {session.user?.name?.split(" ")[0] ?? "there"} 👋
            </h1>
            <p className="text-stone-500 mt-0.5">Here&apos;s an overview of your pickups.</p>
          </div>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-brand-200"
          >
            <Plus className="w-4 h-4" />
            Schedule Pickup
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-stone-100">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
              <div className="text-sm text-stone-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pickup history */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-stone-900 text-lg">Pickups</h2>
              <TrendingUp className="w-5 h-5 text-stone-400" />
            </div>
            <div className="space-y-3">
              {MOCK_PICKUPS.map((pickup) => (
                <div
                  key={pickup.id}
                  className="flex items-center justify-between p-4 bg-stone-50 rounded-xl hover:bg-brand-50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white border border-stone-200 flex items-center justify-center group-hover:border-brand-200 transition-colors">
                      <Package className="w-5 h-5 text-stone-500" />
                    </div>
                    <div>
                      <div className="font-medium text-stone-900 text-sm">{pickup.date}</div>
                      <div className="text-xs text-stone-500">{pickup.boxes} boxes · {pickup.address}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={pickup.status} />
                    <ChevronRight className="w-4 h-4 text-stone-300" />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/schedule"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-stone-200 hover:border-brand-300 hover:bg-brand-50 rounded-xl text-stone-500 hover:text-brand-600 text-sm font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              Schedule new pickup
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Subscription card */}
            <div className="bg-brand-500 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <span className="text-brand-200 text-sm font-semibold uppercase tracking-wide">Your Plan</span>
                <CreditCard className="w-5 h-5 text-brand-300" />
              </div>
              <div className="text-2xl font-bold mb-1">Monthly</div>
              <div className="text-brand-200 text-sm mb-4">$49 / month · Renews Jul 18</div>
              <div className="space-y-1.5">
                {["4 pickups/month", "Unlimited boxes", "Priority slots"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-brand-100">
                    <CheckCircle2 className="w-4 h-4 text-brand-300" />
                    {f}
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                Manage Plan
              </button>
            </div>

            {/* Environmental impact */}
            <div className="bg-white rounded-2xl border border-stone-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-green-500" />
                <h3 className="font-bold text-stone-900">Your Impact</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Boxes recycled</span>
                  <span className="font-bold text-stone-900">42</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: "70%" }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">CO₂ saved</span>
                  <span className="font-bold text-green-600">63 lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-stone-600">Trees equivalent</span>
                  <span className="font-bold text-stone-900">3.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
