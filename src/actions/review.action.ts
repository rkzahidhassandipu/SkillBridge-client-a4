"use server";

import { cookies } from "next/headers";
import { reviewBook } from "@/services/review.service";
import { CreateReviewPayload } from "@/types";



export const createReviewAction = async (data: CreateReviewPayload) => {
  const cookieStore = await cookies();
  return reviewBook.createReview(data, cookieStore.toString());
};

export const getAllReview = async (studentId: string) => {
  if (!studentId) return { data: null, error: { message: "Student ID required" } };

  try {
    const res = await reviewBook.getAllReview(studentId);
    return res;
  } catch (err) {
    return { data: null, error: { message: "Something went wrong" } };
  }
};
export const getAllReviewTutor = async (tutorId: string) => {
  if (!tutorId) {
    return { data: [], error: { message: "Tutor ID required" } };
  }

  try {
    const res = await reviewBook.getAllReviewTutor(tutorId);

    console.log("Action raw response:", res);

    return res; // already { data, error }
  } catch (err) {
    console.error("Action Error:", err);
    return { data: [], error: { message: "Something went wrong" } };
  }
};
