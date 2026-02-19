import {
  getCategories,
  addTutorCategories,
} from "@/actions/categories.actions";
import { getProfile, getTutor } from "@/actions/profile.actions";
import AvailabilityPanel from "@/components/dashboard/availability/availability";
import SubjectGrid from "@/components/dashboard/availability/MySubjects";

const Page = async () => {
  // Fetch data on the server
  const response = await getCategories();
  const userId = await getProfile();
  const tutorData = await getTutor();

  // Safety: ensure these are arrays
  const tutorSubjects = tutorData?.data?.profile?.categories || [];
  const subjectData = response?.data || [];

  return (
    <div className="w-full mx-auto p-4 md:p-10 space-y-10 bg-[#fafafa] min-h-screen">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">
          Availability
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Set your schedule and manage your teaching subjects in one place.
        </p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Availability */}
        <div className="bg-white border border-slate-100 rounded-[1rem] p-6 shadow-sm">
          <AvailabilityPanel />
        </div>

        {/* Subjects */}
        <div className="bg-white border border-slate-100 rounded-[1rem] shadow-sm">
          <SubjectGrid
            userId={userId?.data?.user?.id}
            data={subjectData}
            tutorSubjects={tutorSubjects}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
