import { getBooking } from "@/actions/booking.actions";
import { getAllReview } from "@/actions/review.action";
import BookingDetailsPage from "@/components/dashboard/booking/BookingDetails";
import { userService } from "@/services/user.service";
import { Reviews } from "@/types";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await userService.getSession();

  const reviewRes = await getAllReview(data.user.id);
  const res = await getBooking();
  
  // FIX 1: Ensure this is always an array, even if the API returns a single object
  const rawBookingData = res?.data;
  const bookingsData = Array.isArray(rawBookingData) ? rawBookingData : rawBookingData ? [rawBookingData] : [];

  const myAllReview: Reviews[] = reviewRes.data || [];

  // FIX 2: Check for empty array instead of null
  if (bookingsData.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-700">Booking not found</p>
        </div>
      </div>
    );
  }

  return (
    <BookingDetailsPage 
      bookingsData={bookingsData as any} 
      myAllReview={myAllReview as any} 
    />
  );
}
