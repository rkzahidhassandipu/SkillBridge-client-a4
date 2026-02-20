// src/app/tutors/page.tsx
import { getTutorAll } from "@/actions/profile.actions";
import TutorsPage from "@/components/course/Tutors";
import { Tutor } from "@/types";

export const metadata = {
  title: "Find a Tutor",
  description: "Search and filter tutors by subject, price, and availability.",
};

type TutorsPageProps = {
  tutorAll: Tutor[];
};
export default async function Page() {
  const { data, error } = await getTutorAll();

  const tutors: Tutor[] = data?.data || [];

  console.log('data',tutors)
  return <TutorsPage tutorAll={tutors} />;
}
