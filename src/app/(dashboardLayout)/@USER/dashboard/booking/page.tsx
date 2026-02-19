import { getBooking } from "@/actions/booking.actions";
import { getAllReview } from "@/actions/review.action";
import BookingDetailsPage from "@/components/dashboard/booking/BookingDetails";
import { userService } from "@/services/user.service";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await userService.getSession();

  const myAllReview = await getAllReview(data.user.id);

  const res = await getBooking();
  const booking = res?.data;

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-700">Booking not found</p>
          <p className="text-sm text-slate-400 mt-1">
            Could not load booking details.
          </p>
        </div>
      </div>
    );
  }

  return <BookingDetailsPage bookingsData={booking} myAllReview={myAllReview} />;
}
