"use server"; 
import { bookingService } from "@/services/booking.service";
import { BookingData } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const getBooking = async () => {
    const result = await bookingService.getBookings();
    return result
}

export const createBooking = async (payload: BookingData) => {
  const cookieStore = await cookies(); 
  const cookieHeader = cookieStore.toString();

  const { data, error } = await bookingService.createBooking(
    payload,
    cookieHeader
  );

  if (error) {
    console.error("Action Error:", error.message);
    throw new Error(error.message);
  }
  revalidatePath("/course/[id]/book", "page"); 
  
  return data;
};

export const getTutorBook = async () => {
  // 1. Await the cookies() function
  const cookieStore = await cookies(); 
  
  // 2. Now you can convert it to a string or get specific values
  const cookieHeader = cookieStore.toString();

  const result = await bookingService.getTutorBooking(cookieHeader);
  return result;
};

export const updateBookingStatusAction = async (
  bookingId: string,
  status: "COMPLETED" | "CANCELLED"
) => {
  const cookieStore = await cookies();
  return bookingService.updateBookingStatus(
    bookingId,
    status,
    cookieStore.toString()
  );
};