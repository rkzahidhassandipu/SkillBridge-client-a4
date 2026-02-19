import { getTutorBook } from "@/actions/booking.actions";
import { getAllReviewTutor } from "@/actions/review.action";
import BookingsPage from "@/components/dashboard/booking/booking";
import ReviewsRatings from "@/components/dashboard/ReviewsRatings/ReviewsRatings";
import { userService } from "@/services/user.service";

const Page = async () => {
  const getTutorBooks = await getTutorBook();

  const { data } = await userService.getSession();
  const tutorId = data.user?.id;
  const myAllReview = await getAllReviewTutor(tutorId);
  const bookData = getTutorBooks?.data;


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mx-8 py-6">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
          Bookings & Reviews
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your tutoring sessions and view student feedback in one place.
        </p>
      </div>

      {/* Flex Row */}
      <div className="flex flex-col gap-6">
        <section className="flex-1 bg-white border-slate-200 ">
          <BookingsPage bookData={bookData} />
        </section>

        <section className="flex-1 bg-white border-slate-200 ">
          <ReviewsRatings myAllReview={myAllReview} />
        </section>
      </div>
    </div>
  );
};

export default Page;
