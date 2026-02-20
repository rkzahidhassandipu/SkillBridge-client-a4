import { getSingleTutor } from "@/actions/profile.actions";
import TutorProfile from "@/components/course/single/TutorProfile";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const singleTutor = await getSingleTutor(id);
  const tutorData = singleTutor?.data?.data;

  if (!tutorData) {
    return (
      <div className="min-h-screen bg-[#f8f7f4] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-bold text-slate-700">Tutor not found</p>
          <p className="text-sm text-slate-400 mt-1">Could not load tutor profile.</p>
        </div>
      </div>
    );
  }

  return <TutorProfile tutor={tutorData} />;
}