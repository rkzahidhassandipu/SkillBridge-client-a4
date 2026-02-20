import { getTutorAll } from "@/actions/profile.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InstructorCard } from "./InstructorCard";
import { Instructor } from "@/types"; // make sure this is correctly defined

export default async function FeaturedInstructors() {
  const profile = await getTutorAll();

  // Explicitly type the data
  const data: Instructor[] = profile?.data?.data || [];

  // Limit to maximum 8 instructors
  const displayedInstructors = data.slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Our featured instructors</h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Highly qualified professionals
          </p>
          <p className="text-muted-foreground mt-1 text-sm max-w-xl mx-auto">
            Accusamus et iusidio dignissimos ducimus blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores etmuqasa molestias
            espturi sint occaecati cupiditate non providente mikume.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayedInstructors.map((instructor: Instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/course">
            <Button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition">
              Explore all instructors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}