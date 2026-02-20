import { Tutor } from "@/types";
import BookSession from "./BookSession";

export default function BookSessionWrapper({
  tutor,
  createBooking
}: {
  tutor: Tutor;
  createBooking?: (data: any) => Promise<void>;
}) {
  // যদি createBooking না দেয়া হয়, তাহলে একটা dummy async function use করা
  const handleBooking = createBooking ?? (async (data: any) => {});

  return <BookSession tutor={tutor} createBooking={handleBooking} />;
}
