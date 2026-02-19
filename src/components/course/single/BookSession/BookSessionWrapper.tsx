"use client";
import BookSession from "./BookSession";
import { Tutor } from "@/types";

export default function BookSessionWrapper({
  tutor,
  createBooking
}: {
  tutor: Tutor;
  createBooking?: (data: any) => Promise<void>;
}) {
  return <BookSession tutor={tutor} createBooking={createBooking} />;
}
