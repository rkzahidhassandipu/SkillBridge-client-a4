"use client";

import { useState } from "react";
import { Star, Heart, CheckCircle2, Mail, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AvailabilityPills from "./AvailabilityPills";
import { Tutor } from "@/types";
import { useRouter } from "next/navigation";

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    tutor.user.name,
  )}&background=f97316&color=fff&size=200`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col sm:flex-row">
        {/* ── Avatar Panel ── */}
        <div className="sm:w-52 flex-shrink-0 bg-gradient-to-br from-orange-50 via-amber-50 to-white flex flex-col items-center justify-center p-6 gap-3 border-r border-gray-100">
          <div className="relative">
            <img
              src={tutor.user.image || fallback}
              alt={tutor.user.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallback;
              }}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md group-hover:ring-orange-100 transition-all duration-300"
            />
            <span className="absolute bottom-1 right-1 bg-green-400 w-3.5 h-3.5 rounded-full border-2 border-white shadow" />
          </div>

          <div className="text-center">
            <p className="font-bold text-gray-800 text-sm">{tutor.user.name}</p>
            <div className="flex items-center justify-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.round(tutor.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-gray-200 text-gray-200",
                  )}
                />
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-0.5">
              {tutor.rating > 0 ? `${tutor.rating.toFixed(1)} · ` : "New · "}
              {tutor.totalReviews}{" "}
              {tutor.totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="w-full space-y-1.5 text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5 min-w-0">
              <Mail className="h-3 w-3 text-orange-400 shrink-0" />
              <span className="truncate">{tutor.user.email}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-orange-400 shrink-0" />
              <span>{tutor.user.phone}</span>
            </span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 p-5 flex flex-col gap-3 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-gray-900 text-base leading-tight">
                  {tutor.user.name}
                </h3>
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Member since{" "}
                {new Date(tutor.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[11px] text-gray-400">Starting from:</p>
              <p className="text-2xl font-extrabold text-blue-600 leading-tight">
                ${tutor.pricePerHour}
                <span className="text-sm font-semibold text-blue-400">/hr</span>
              </p>
              <button
                onClick={() => setSaved(!saved)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-400 transition-colors mt-0.5 ml-auto"
              >
                <Heart
                  className={cn(
                    "h-3.5 w-3.5",
                    saved && "fill-red-500 text-red-500",
                  )}
                />
                {saved ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {tutor.bio}
          </p>

          {/* Availability */}
          <AvailabilityPills availabilities={tutor.availabilities} />

          {/* Category Badges */}
          <div className="flex flex-wrap gap-1.5">
            {tutor.categories.slice(0, 5).map(({ category }) => (
              <Badge
                key={category.id}
                variant="secondary"
                className="text-[11px] bg-orange-50 text-orange-600 border border-orange-100 hover:bg-orange-100 capitalize cursor-default"
              >
                {category.name}
              </Badge>
            ))}
            {tutor.categories.length > 5 && (
              <Badge
                variant="secondary"
                className="text-[11px] bg-gray-100 text-gray-400"
              >
                +{tutor.categories.length - 5} more
              </Badge>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              {tutor.availabilities.length} time slot
              {tutor.availabilities.length !== 1 ? "s" : ""} available
            </p>
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-5 font-semibold rounded-full shadow-sm"
              onClick={() => router.push(`/course/${tutor.id}`)} // Navigate to single tutor page
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
