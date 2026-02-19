"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewTutuor } from "@/types/booking";

type ReviewsRatingsProps = {
  myAllReview: ReviewTutuor[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsRatings({ myAllReview }: ReviewsRatingsProps) {
  const totalReviews = myAllReview?.length || 0;
const AllReview = myAllReview?.data
  return (
    <div className="w-full mx-auto p-6">
      <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-purple-50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              Reviews & Ratings
            </CardTitle>
            <span className="text-sm text-gray-600 font-medium">
              {totalReviews} total reviews
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {AllReview.map((review) => (
            <Card
              key={review.id}
              className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.student.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {review.student.email}
                    </p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-gray-700 leading-relaxed mb-3">
                  {review.comment}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
