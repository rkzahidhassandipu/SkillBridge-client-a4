import { getTutorAll } from "@/actions/profile.actions";
import { TutorCard } from "./TutorCard";
import { Instructor } from "@/types"; // make sure this matches your API structure

export default async function TutorsSection() {
  const profile = await getTutorAll();

  // Explicitly type the data
  const data: Instructor[] = profile?.data?.data || [];
  const shuffled = data.sort(() => 0.5 - Math.random());
  const tutorsToShow = shuffled.slice(0, 4);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet Our Professional Tutors
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {tutorsToShow.map((tutor: Instructor) => (
            <TutorCard
              key={tutor.id}
              name={tutor.user.name}
              bio={tutor.bio}
              image={
                tutor.user.image ||
                "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}