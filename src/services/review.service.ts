import { env } from "@/env";
import { Booking, CreateReviewPayload, Review } from "@/types";

export interface CreateBookingPayload {
  tutorId: string;
  categoryId: string;
  date: string;
  timeSlot: string;
}
export interface ApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

const API_URL = env.API_URL;
export const reviewBook = {
  createReview: async (
    payload: CreateReviewPayload,
    cookieHeader?: string
  ): Promise<ApiResponse<Review>> => {
    try {
      const res = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: responseData.message || "Failed to create review" },
        };
      }

      return {
        data: responseData.data as Review,
        error: null,
      };
    } catch (error) {
      console.error("Create review error:", error);
      return {
        data: null,
        error: { message: "Something went wrong" },
      };
    }
  },
  getAllReview: async (studentId: string, cookie?: string) => {
  try {
    const res = await fetch(`${API_URL}/review/student/${studentId}`, {
      headers: cookie ? { Cookie: cookie } : {},
    });

    if (res.status === 401) {
      return { data: null, error: { message: "Unauthorized" } };
    }

    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
},
 getAllReviewTutor: async (tutorId: string) => {
  const res = await fetch(`${API_URL}/review/tutor/${tutorId}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return { data, error: null };
},

};
