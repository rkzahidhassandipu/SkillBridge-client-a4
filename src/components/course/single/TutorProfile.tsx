"use client";

import { useState } from "react";
import Link from "next/link";
import { Tutor } from "@/types";

const ALL_DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday",
  "Friday", "Saturday", "Sunday",
];
const DAY_SHORT: Record<string, string> = {
  Monday: "MON", Tuesday: "TUE", Wednesday: "WED",
  Thursday: "THU", Friday: "FRI", Saturday: "SAT", Sunday: "SUN",
};

function fmt(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

interface TutorProfilePageProps {
  tutor: Tutor;
}

export default function TutorProfile({ tutor }: TutorProfilePageProps) {
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"about" | "schedule" | "reviews">("about");

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.user.name)}&background=0f172a&color=f97316&size=200`;
  const uniqueDays = [...new Set(tutor.availabilities.map((a) => a.day))];

  return (
    <div className="min-h-screen bg-[#f8f7f4]">

      {/* ── Hero Banner ── */}
      <div className="relative h-52 bg-gradient-to-br from-orange-200 via-orange-100 to-orange-300 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-400 rounded-full translate-x-1/3 translate-y-1/3" />
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-orange-400/30 rounded-full"
              style={{
                width: `${(i + 1) * 80}px`,
                height: `${(i + 1) * 80}px`,
                top: "50%", left: "65%",
                transform: "translate(-50%,-50%)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 left-4 flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to tutors
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* ── Profile Header ── */}
        <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row items-start sm:items-end gap-4">

          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={tutor.user.image || fallback}
              alt={tutor.user.name}
              onError={(e) => { (e.target as HTMLImageElement).src = fallback; }}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-xl"
            />
            <span className="absolute -bottom-1 -right-1 bg-green-400 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow">
              ACTIVE
            </span>
          </div>

          {/* Name + meta */}
          <div className="flex-1 pb-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-orange-400 tracking-tight">
                {tutor.user.name}
              </h1>
              <svg className="w-5 h-5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-slate-500 text-sm mt-0.5">{tutor.bio}</p>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < Math.round(tutor.rating) ? "text-amber-400" : "text-gray-200"}`}
                    fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-slate-400 ml-1.5">
                  {tutor.rating > 0 ? `${tutor.rating.toFixed(1)} (${tutor.totalReviews})` : "No ratings yet"}
                </span>
              </div>
              <span className="text-slate-300">·</span>
              <span className="text-xs text-slate-400">
                Joined{" "}
                {new Date(tutor.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </span>
            </div>
          </div>

          {/* Price + actions */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="text-right">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider">Starting from</p>
              <p className="text-3xl font-black text-orange-400">
                ${tutor.pricePerHour}
                <span className="text-base font-medium text-slate-400">/hr</span>
              </p>
            </div>
            <div className="flex gap-2">
              {/* Save button */}
              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  saved
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-400"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${saved ? "fill-red-500" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {saved ? "Saved" : "Save"}
              </button>

              {/* ✅ Book Session button — fixed */}
              <Link
                href={`/course/${tutor.id}/book`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-sm shadow-orange-200"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Session
              </Link>
            </div>
          </div>
        </div>

        {/* ── Contact Strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {[
            { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Email",     value: tutor.user.email },
            { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", label: "Phone",     value: tutor.user.phone },
            { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",                                                                                                                                                                                  label: "Available", value: `${uniqueDays.length} days / week` },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-semibold text-slate-700 truncate">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-slate-100 rounded-2xl p-1 shadow-sm mb-6 w-fit">
          {(["about", "schedule", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                tab === t ? "bg-slate-900 text-white shadow" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t}
              {t === "reviews" && tutor.totalReviews > 0 && (
                <span className="ml-1.5 text-[10px] bg-orange-100 text-orange-500 px-1.5 py-0.5 rounded-full">
                  {tutor.totalReviews}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Tab: About ── */}
        {tab === "about" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">About</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{tutor.bio || "No bio provided yet."}</p>
              <div className="mt-4 pt-4 border-t border-slate-50 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Rate</p>
                  <p className="text-lg font-black text-orange-500">
                    ${tutor.pricePerHour}<span className="text-xs font-normal text-slate-400">/hr</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Reviews</p>
                  <p className="text-lg font-black text-slate-800">
                    {tutor.totalReviews}<span className="text-xs font-normal text-slate-400"> total</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Subjects <span className="text-orange-400">({tutor.categories.length})</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {tutor.categories.map(({ category }) => (
                  <span
                    key={category.id}
                    className="px-3 py-1.5 bg-orange-50 text-orange-600 border border-orange-100 rounded-xl text-xs font-semibold capitalize hover:bg-orange-100 transition-colors cursor-default"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab: Schedule ── */}
        {tab === "schedule" && (
          <div className="pb-12 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Weekly Overview</h2>
              <div className="flex gap-2 flex-wrap">
                {ALL_DAYS.map((day) => {
                  const active = uniqueDays.includes(day);
                  const count = tutor.availabilities.filter((a) => a.day === day).length;
                  return (
                    <div
                      key={day}
                      className={`flex flex-col items-center px-3 py-2 rounded-xl border transition-all ${
                        active ? "bg-slate-900 border-slate-900 text-white" : "bg-slate-50 border-slate-100 text-slate-300"
                      }`}
                    >
                      <span className="text-[10px] font-bold tracking-wider">{DAY_SHORT[day]}</span>
                      {active && (
                        <span className="text-[9px] text-orange-400 font-semibold mt-0.5">
                          {count} slot{count > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {ALL_DAYS.filter((d) => uniqueDays.includes(d)).map((day) => {
              const slots = tutor.availabilities.filter((a) => a.day === day);
              return (
                <div key={day} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-orange-400" />
                    <h3 className="font-bold text-slate-800 text-sm">{day}</h3>
                    <span className="ml-auto text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full">
                      {slots.length} slot{slots.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {slots.map((s) => (
                      <div
                        key={s.id}
                        className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5 group hover:bg-orange-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900">
                            {fmt(s.startTime)} – {fmt(s.endTime)}
                          </span>
                        </div>
                        {/* ✅ Slot-level Book button also links to book page */}
                        <Link
                          href={`/course/${tutor.id}/book`}
                          className="text-[11px] font-bold text-orange-500 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-all bg-orange-100 hover:bg-orange-200 px-2.5 py-1 rounded-lg"
                        >
                          Book
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Tab: Reviews ── */}
        {tab === "reviews" && (
          <div className="pb-12">
            {tutor.totalReviews === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-10 shadow-sm text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="font-bold text-slate-700 text-lg">No reviews yet</p>
                <p className="text-slate-400 text-sm mt-1">
                  Be the first to book a session with {tutor.user.name.split(" ")[0]}!
                </p>
                {/* ✅ Reviews tab Book button also links */}
                <Link
                  href={`/course/${tutor.id}/book`}
                  className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-colors"
                >
                  Book a Session
                </Link>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-400">
                <p>Reviews coming soon...</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}