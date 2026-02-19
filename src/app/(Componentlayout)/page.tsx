import TutorStudentBanner from "@/components/home/banner/banner";
import FeaturesSection from "@/components/home/features/FeaturesSection";
import FeaturedInstructors from "@/components/home/instructors/FeaturedInstructors";
import StatsSection from "@/components/home/stats/StatsSection";
import TutorsSection from "@/components/home/tutors/TutorsSection";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore)
  return (
    <div >
       <TutorStudentBanner />
       <TutorsSection />
       <FeaturedInstructors />
       <FeaturesSection />
       <StatsSection />
    </div>
  );
}
