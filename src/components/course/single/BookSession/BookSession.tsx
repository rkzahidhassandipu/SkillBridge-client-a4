"use client";

import { BookingData, Tutor } from "@/types";
import { useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ALL_DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function getNextDateForDay(dayName: string): string {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = new Date();
  const target = days.indexOf(dayName);
  const diff = (target - today.getDay() + 7) % 7 || 7;
  const next = new Date(today);
  next.setDate(today.getDate() + diff);
  return next.toISOString().split("T")[0];
}

function formatDateDisplay(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

const STEPS = ["Select Slot", "Pick Date", "Subject", "Review & Confirm"];

interface BookSessionPageProps {
  tutor: Tutor;
  createBooking: (data: any) => Promise<void>;
}

export default function BookSession({ tutor, createBooking }: BookSessionPageProps) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<typeof tutor.availabilities[0] | null>(null);

  const [form, setForm] = useState<BookingData>({
    tutorId: tutor?.user?.id,
    categoryId: "",
    date: "",
    timeSlot: "",
  });

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.user.name)}&background=0f172a&color=f97316&size=200`;

  // Group availabilities by day
  const slotsByDay = ALL_DAYS.reduce<Record<string, typeof tutor.availabilities>>((acc, day) => {
    const slots = tutor.availabilities.filter((a) => a.day === day);
    if (slots.length) acc[day] = slots;
    return acc;
  }, {});

  const pickSlot = (slot: typeof tutor.availabilities[0]) => {
    setSelectedSlot(slot);
    setForm((prev) => ({
      ...prev,
      timeSlot: `${slot.startTime}-${slot.endTime}`,
      date: getNextDateForDay(slot.day),
    }));
  };

  const canNext = [
    !!form.timeSlot,     // step 0 — slot chosen
    !!form.date,         // step 1 — date chosen
    !!form.categoryId,   // step 2 — category chosen
    true,                // step 3 — review
  ];

  const handleSubmit = async () => {
    setSubmitting(true);
    setApiError(null);
    try {
      await createBooking(form);
      setSubmitted(true);
    } catch (e: any) {
      console.error("Booking error:", e);
      setApiError(e.message || "Failed to save booking");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Session Booked!</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Your session with <span className="font-semibold text-slate-700">{tutor.user.name}</span> has been confirmed.
          </p>
          <div className="bg-slate-50 rounded-2xl p-4 text-left space-y-2.5 mb-6 text-sm">
            <Row label="Tutor" value={tutor.user.name} />
            <Row label="Date" value={formatDateDisplay(form.date)} />
            <Row label="Time" value={form.timeSlot.replace("-", " – ")} />
            <Row label="Rate" value={`$${tutor.pricePerHour}/hr`} />
          </div>
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* ── Header ── */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => step > 0 ? setStep(step - 1) : window.history.back()}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <p className="text-[11px] text-slate-400 uppercase tracking-wider">Book Session</p>
            <p className="text-sm font-bold text-slate-800">{STEPS[step]}</p>
          </div>
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < step ? "w-5 bg-green-400" : i === step ? "w-5 bg-orange-500" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">

        {/* ── Tutor mini card ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center gap-4">
          <img
            src={tutor.user.image || fallback}
            alt={tutor.user.name}
            onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
            className="w-14 h-14 rounded-xl object-cover border-2 border-slate-100 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm">{tutor.user.name}</p>
            <p className="text-xs text-slate-400 truncate">{tutor.bio}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[10px] text-slate-400">Rate</p>
            <p className="text-lg font-black text-orange-500">
              ${tutor.pricePerHour}<span className="text-xs font-normal text-slate-400">/hr</span>
            </p>
          </div>
        </div>

        {/* ════════════════════════════
            STEP 0 — Select Time Slot
        ════════════════════════════ */}
        {step === 0 && (
          <div className="space-y-3">
            <SectionTitle icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z">
              Choose an Available Slot
            </SectionTitle>
            {Object.entries(slotsByDay).map(([day, slots]) => (
              <div key={day} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-50 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="font-bold text-slate-800 text-sm">{day}</span>
                  <span className="ml-auto text-[11px] text-slate-400">
                    {slots.length} slot{slots.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {slots.map((slot) => {
                    const selected = form.timeSlot === `${slot.startTime}-${slot.endTime}`;
                    return (
                      <button
                        key={slot.id}
                        onClick={() => pickSlot(slot)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                          selected
                            ? "border-orange-400 bg-orange-50"
                            : "border-slate-100 hover:border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-orange-500" : "bg-white border border-slate-200"}`}>
                          <svg className={`w-4 h-4 ${selected ? "text-white" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold ${selected ? "text-orange-700" : "text-slate-700"}`}>
                            {fmt(slot.startTime)} – {fmt(slot.endTime)}
                          </p>
                          <p className={`text-[11px] font-mono ${selected ? "text-orange-400" : "text-slate-400"}`}>
                            {slot.startTime}–{slot.endTime}
                          </p>
                        </div>
                        {selected && (
                          <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ════════════════════════════
            STEP 1 — Pick Date
        ════════════════════════════ */}
        {step === 1 && (
          <div className="space-y-3">
            <SectionTitle icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
              Pick a Date
            </SectionTitle>

            {selectedSlot && (
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-orange-500 font-semibold">Selected slot</p>
                  <p className="text-sm font-bold text-orange-800">
                    {selectedSlot.day} · {fmt(selectedSlot.startTime)} – {fmt(selectedSlot.endTime)}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select date for {selectedSlot?.day}
              </p>
              <input
                type="date"
                value={form.date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              {selectedSlot && (
                <div>
                  <p className="text-[11px] text-slate-400 mb-2">Quick pick — upcoming {selectedSlot.day}s:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[0, 1, 2, 3].map((offset) => {
                      const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                      const target = days.indexOf(selectedSlot.day);
                      const today = new Date();
                      const diff = (target - today.getDay() + 7) % 7 || 7;
                      const d = new Date(today);
                      d.setDate(today.getDate() + diff + offset * 7);
                      const val = d.toISOString().split("T")[0];
                      const isSelected = form.date === val;
                      return (
                        <button
                          key={offset}
                          onClick={() => setForm({ ...form, date: val })}
                          className={`px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all text-left ${
                            isSelected
                              ? "bg-slate-900 border-slate-900 text-white"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          <p className={isSelected ? "text-orange-400" : "text-slate-400"} style={{fontSize:"10px"}}>
                            {offset === 0 ? "Next" : `+${offset}w`}
                          </p>
                          {formatDateDisplay(val)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════
            STEP 2 — Select Subject/Category
        ════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-3">
            <SectionTitle icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253">
              Select Subject
            </SectionTitle>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Available Subjects
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tutor.categories?.map((cat: any) => {
                  const catId = cat?.category?.id;
                  const catName = cat?.category?.name;
                  const isSelected = form.categoryId === catId;
                  return (
                    <button
                      key={catId}
                      onClick={() => setForm({ ...form, categoryId: catId })}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? "border-orange-400 bg-orange-50"
                          : "border-slate-100 hover:border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-orange-500" : "bg-white border border-slate-200"
                      }`}>
                        <svg className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className={`text-sm font-bold flex-1 ${isSelected ? "text-orange-700" : "text-slate-700"}`}>
                        {catName}
                      </p>
                      {isSelected && (
                        <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
              {tutor.categories?.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No subjects available</p>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════
            STEP 3 — Review & Confirm
        ════════════════════════════ */}
        {step === 3 && (
          <div className="space-y-3">
            <SectionTitle icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4">
              Review your booking
            </SectionTitle>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-5 py-3 bg-slate-900 flex items-center gap-3">
                <img
                  src={tutor.user.image || fallback}
                  alt={tutor.user.name}
                  onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
                  className="w-10 h-10 rounded-xl object-cover border-2 border-white/20"
                />
                <div>
                  <p className="font-bold text-white text-sm">{tutor.user.name}</p>
                  <p className="text-xs text-slate-400">{tutor.user.email}</p>
                </div>
                <p className="ml-auto text-orange-400 font-black text-lg">
                  ${tutor.pricePerHour}<span className="text-xs font-normal text-slate-400">/hr</span>
                </p>
              </div>

              <div className="p-5 space-y-3">
                <Row label="Date"      value={formatDateDisplay(form.date)}             icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <Row label="Time Slot" value={form.timeSlot.replace("-", " – ")}        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                <Row label="Day"       value={selectedSlot?.day ?? "—"}                 icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <Row
                  label="Subject"
                  value={tutor.categories?.find((c: any) => c?.category?.id === form.categoryId)?.category?.name ?? "—"}
                  icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </div>

              <div className="px-5 py-3 bg-orange-50 border-t border-orange-100 flex items-center justify-between">
                <p className="text-xs text-orange-600 font-semibold">Rate per session</p>
                <p className="text-lg font-black text-orange-600">${tutor.pricePerHour}</p>
              </div>
            </div>

            {/* Payload preview */}

            {/* API Error */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm text-red-600 font-semibold">{apiError}</p>
              </div>
            )}

            <p className="text-xs text-slate-400 text-center px-4">
              By confirming, you agree to the session terms. The tutor will be notified shortly.
            </p>
          </div>
        )}

        {/* ── Navigation Buttons ── */}
        <div className="flex gap-3 pt-2 pb-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3.5 border-2 border-slate-200 hover:border-slate-300 text-slate-600 font-bold rounded-xl transition-all"
            >
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext[step]}
              className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl transition-all"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 py-3.5 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Booking...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Confirm Booking
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
        <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
      <h2 className="font-black text-slate-800 text-base">{children}</h2>
    </div>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
      )}
      <div className="flex-1">
        <p className="text-[11px] text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-semibold text-slate-700 leading-snug">{value}</p>
      </div>
    </div>
  );
}