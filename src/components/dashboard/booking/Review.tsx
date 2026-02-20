"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, Star, PenLine } from "lucide-react";

import { createReviewAction } from "@/actions/review.action";
import { Review } from "@/types";

interface ReviewSectionProps {
  review: Review | null | undefined;
  bookingId: string;
  tutorName: string;
  tutorId: string;
  studentId: string;
  onSubmit?: (data: {
    bookingId: string;
    rating: number;
    comment: string;
  }) => void;
}

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const RATING_CONFIG = [
  null,
  {
    label: "Poor",
    color: "text-red-500",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700 border-red-200",
    bar: "bg-red-400",
  },
  {
    label: "Fair",
    color: "text-orange-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    bar: "bg-orange-400",
  },
  {
    label: "Good",
    color: "text-yellow-500",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    bar: "bg-yellow-400",
  },
  {
    label: "Very Good",
    color: "text-lime-500",
    bg: "bg-lime-50",
    border: "border-lime-200",
    badge: "bg-lime-100 text-lime-700 border-lime-200",
    bar: "bg-lime-400",
  },
  {
    label: "Excellent",
    color: "text-green-500",
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700 border-green-200",
    bar: "bg-green-500",
  },
];

export default function ReviewSection({
  review,
  bookingId,
  tutorName,
  tutorId,
  studentId,
  onSubmit,
}: ReviewSectionProps) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(
    review || null,
  );

  const activeRating = hovered || rating;
  const config = RATING_CONFIG[activeRating];

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Please select a star rating before submitting.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await createReviewAction({
        bookingId,
        tutorId,
        studentId,
        rating,
        comment,
      });

      if (res.error) {
        setError(res.error.message || "Failed to submit review.");
        setLoading(false);
        return;
      }

      // ✅ Update the local review immediately
      setCurrentReview({ bookingId, rating, comment } as any);
      setSubmitted(true);
      onSubmit?.({ bookingId, rating, comment });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ─── SUCCESS STATE ─── */
  if (currentReview && currentReview.rating > 0) {
    const cfg = RATING_CONFIG[currentReview.rating] ?? {
      label: "",
      color: "",
      bg: "",
      border: "",
      badge: "",
      bar: "",
    };

    return (
      <div className="mt-5 pt-5 border-t border-dashed border-amber-200">
        <Card className={`border shadow-sm ${cfg.border} ${cfg.bg}`}>
          <CardContent className="flex items-start gap-4 pt-5 pb-5">
            <CheckCircle2 className="w-5 h-5 mt-0.5 text-green-500 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">
                Review already submitted
              </p>
              <p className="text-xs text-green-700 mt-1">
                Rating: {currentReview.rating} / 5 ·{" "}
                <span className={cfg.color}>
                  {RATING_LABELS[currentReview.rating]}
                </span>
              </p>
              {currentReview.comment && (
                <p className="mt-3 text-xs italic text-green-800 bg-white/60 rounded-lg px-3 py-2 border border-green-200 break-words">
                  "{currentReview.comment}"
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ─── FORM STATE ─── */
  return (
    <div className="mt-5 pt-5 border-t border-dashed border-amber-200">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-sm shrink-0">
          <PenLine className="w-4 h-4 text-amber-700" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800 leading-none">
            Rate your session
          </p>
          <p className="text-xs text-gray-400 mt-0.5">with {tutorName}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
          Your Rating
        </p>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => {
            const filled = star <= activeRating;
            return (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                className="p-1 rounded-lg transition-all duration-150 hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-1"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={cn(
                    "w-7 h-7 transition-all duration-150",
                    filled
                      ? cn(
                          "fill-current drop-shadow-sm",
                          config?.color ?? "text-gray-300",
                        )
                      : "text-gray-200 fill-gray-100",
                  )}
                />
              </button>
            );
          })}

          {activeRating > 0 && config && (
            <Badge
              variant="outline"
              className={cn(
                "ml-2 text-xs font-semibold px-2.5 py-0.5 rounded-full transition-all duration-200",
                config.badge,
              )}
            >
              {config.label}
            </Badge>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-2.5 h-1 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              config?.bar ?? "bg-gray-200",
            )}
            style={{ width: `${(activeRating / 5) * 100}%` }}
          />
        </div>
      </div>

      <Separator className="mb-5 bg-gray-100" />

      {/* Comment */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Comment{" "}
            <span className="normal-case font-normal text-gray-300">
              (optional)
            </span>
          </p>
          <span
            className={cn(
              "text-[11px] tabular-nums transition-colors",
              comment.length > 270
                ? "text-orange-400 font-semibold"
                : "text-gray-300",
            )}
          >
            {comment.length}/300
          </span>
        </div>

        <Textarea
          value={comment}
          onChange={(e) =>
            e.target.value.length <= 300 && setComment(e.target.value)
          }
          placeholder={`Share your experience with ${tutorName}…`}
          rows={3}
          className="resize-none text-sm bg-gray-50 border-gray-200 focus:border-indigo-400 focus-visible:ring-indigo-100 focus-visible:ring-2 rounded-xl placeholder:text-gray-300 transition-all"
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
          <span className="shrink-0">⚠️</span>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={loading}
        className={cn(
          "gap-2 font-semibold tracking-wide rounded-xl text-sm px-5",
          "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600",
          "shadow-md hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200",
          "disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0",
        )}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Star className="w-4 h-4 fill-current" />
            Submit Review
          </>
        )}
      </Button>
    </div>
  );
}
