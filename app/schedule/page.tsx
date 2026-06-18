"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Loader2,
  ArrowLeft,
} from "lucide-react";

const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];

export default function SchedulePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const [boxes, setBoxes] = useState("10");
  const [notes, setNotes] = useState("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

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

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function isDisabled(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d <= todayStart || d.getDay() === 0; // no Sundays, no past dates
  }

  function formatDate(day: number) {
    return `${MONTH_NAMES[viewMonth]} ${day}, ${viewYear}`;
  }

  async function handleConfirm() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // Simulate API call
    setLoading(false);
    setStep(3);
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-stone-900">
              Cardboard<span className="text-brand-500">Caddie</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">Schedule a Pickup</h1>
          <p className="text-stone-500 mt-1">Choose a date, time, and we&apos;ll handle the rest.</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {[
            { n: 1, label: "Date & Time" },
            { n: 2, label: "Details" },
            { n: 3, label: "Confirmed" },
          ].map(({ n, label }, i, arr) => (
            <div key={n} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 ${step >= n ? "text-brand-600" : "text-stone-400"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  step > n ? "bg-brand-500 border-brand-500 text-white" :
                  step === n ? "border-brand-500 text-brand-600" :
                  "border-stone-200 text-stone-400"
                }`}>
                  {step > n ? <CheckCircle2 className="w-4 h-4" /> : n}
                </div>
                <span className="text-xs font-medium hidden sm:block">{label}</span>
              </div>
              {i < arr.length - 1 && <div className="flex-1 h-px bg-stone-200" />}
            </div>
          ))}
        </div>

        {/* Step 1: Date & Time */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-stone-600" />
                </button>
                <h2 className="font-semibold text-stone-900">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </h2>
                <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-stone-100 transition-colors">
                  <ChevronRight className="w-4 h-4 text-stone-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-xs font-semibold text-stone-400 py-1">
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const disabled = isDisabled(day);
                  const dateStr = formatDate(day);
                  const selected = selectedDate === dateStr;
                  return (
                    <button
                      key={day}
                      disabled={disabled}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                        disabled
                          ? "text-stone-200 cursor-not-allowed"
                          : selected
                          ? "bg-brand-500 text-white shadow-md shadow-brand-200"
                          : "text-stone-700 hover:bg-brand-50 hover:text-brand-600"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="bg-white rounded-2xl border border-stone-100 p-6">
                <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500" />
                  Available times for {selectedDate}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all text-left ${
                        selectedSlot === slot
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-stone-200 text-stone-700 hover:border-stone-300"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              disabled={!selectedDate || !selectedSlot}
              onClick={() => setStep(2)}
              className="w-full bg-brand-500 hover:bg-brand-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-semibold py-3.5 rounded-xl transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-stone-100 p-6">
              <h3 className="font-semibold text-stone-900 mb-5">Pickup details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    Pickup address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Main St, City, State 00000"
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 placeholder:text-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    Estimated number of boxes
                  </label>
                  <select
                    value={boxes}
                    onChange={(e) => setBoxes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 bg-white"
                  >
                    {["1–5", "6–10", "11–20", "20–40", "40+"].map((v) => (
                      <option key={v} value={v}>{v} boxes</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">
                    Notes for the driver (optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Boxes are at the side gate. Please call on arrival."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition text-stone-900 placeholder:text-stone-400 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5">
              <h4 className="font-semibold text-stone-900 mb-3">Pickup summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500 flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> Date</span>
                  <span className="font-medium text-stone-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500 flex items-center gap-1.5"><Clock className="w-4 h-4" /> Time</span>
                  <span className="font-medium text-stone-900">{selectedSlot}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-white hover:bg-stone-50 text-stone-700 font-semibold py-3.5 rounded-xl border border-stone-200 transition-colors"
              >
                Back
              </button>
              <button
                disabled={!address || loading}
                onClick={handleConfirm}
                className="flex-[2] bg-brand-500 hover:bg-brand-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {loading ? "Confirming…" : "Confirm Pickup"}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed */}
        {step === 3 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">Pickup confirmed!</h2>
            <p className="text-stone-600 max-w-sm mx-auto mb-2">
              We&apos;ll be there on <strong>{selectedDate}</strong> between{" "}
              <strong>{selectedSlot}</strong>.
            </p>
            <p className="text-sm text-stone-500 mb-8">
              A confirmation email has been sent to{" "}
              <strong>{session.user?.email}</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Back to Dashboard
              </Link>
              <button
                onClick={() => { setStep(1); setSelectedDate(null); setSelectedSlot(null); setAddress(""); }}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-semibold px-6 py-3 rounded-xl border border-stone-200 transition-colors"
              >
                Schedule Another
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
