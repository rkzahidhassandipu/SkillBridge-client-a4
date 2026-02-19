import { getTutorAll } from "@/actions/profile.actions";
import TutorsPage from "@/components/course/Tutors";


export const metadata = {
  title: "Find a Tutor",
  description: "Search and filter tutors by subject, price, and availability.",
};

// This is a Server Component — no "use client" directive
export default async function Page() {
  const TuturAll = await getTutorAll()
  return <TutorsPage tutorAll={TuturAll} />;
}