"use client";

import { Card, CardContent } from "@/components/ui/card";
import ProfileImageUpload from "../profile/ProfileImageUpload";
import TutorStats from "./TutorStats";
import EditProfileDialog from "./EditProfileDialog";
import Link from "next/link";
import { Star, DollarSign, Calendar, Clock } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import CreateTutorProfileDialog from "./CreateTutorProfileDialog";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function TutorProfile({
  tutor,
  profile,
  subjectData,
  createProfile,
}: any) {
  const [tutorProfile, setTutorProfile] = useState(tutor?.profile || null);
  const { bio, pricePerHour, rating, totalReviews, categories, userId } =
    tutorProfile || {};
  const { id, name, email, image, status, phone } = profile?.user || {};

  const stats = [
    {
      icon: Star,
      value: rating || "N/A",
      label: "Average Rating",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: DollarSign,
      value: `$${pricePerHour || 0}`,
      label: "Price / Hour",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Calendar,
      value: totalReviews || 0,
      label: "Total Reviews",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Clock,
      value: status || "N/A",
      label: "Account Status",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("toast") === "profile-required") {
      toast.warning("Please create tutor profile first!");
    }
  }, [searchParams]);

  const tutorUserId = String(userId || ""); // fallback to empty string
  const profileUserId = String(id || "");

  return (
    <div className="min-h-screen bg-gray-100 pt-8 px-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="shadow-lg bg-white">
          <CardContent className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
            <div className="flex items-center gap-6">
              <ProfileImageUpload
                imageUrl={image}
                initials={name ? name[0] : "U"}
                onUpload={(url) => {
                  // optional: update tutor profile image if needed
                  // e.g., call an API to save it or just update local state
                  console.log("New uploaded image URL:", url);
                }}
                size={120} // optional
              />

              <div>
                <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {bio || "No bio added yet"}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories?.map((cat: any, idx: number) => (
                    <CategoryBadge
                      key={idx}
                      name={cat?.category?.name || "Unknown"}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-3">{email}</p>
                <p className="text-xs text-gray-500">
                  {phone || "No phone number"}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <EditProfileDialog
                triggerText="Edit Profile"
                profile={profile}
                tutor={tutor}
                categories={categories?.map((c: any) => c.category?.name) || []}
              />

              {tutorUserId === profileUserId ? (
                <Link href="/tutor-dashboard/availability">
                  <button className="bg-yellow-200 hover:bg-yellow-500 text-red-800 px-4 py-2 rounded">
                    Manage Availability
                  </button>
                </Link>
              ) : (
                <CreateTutorProfileDialog
                  subjectData={subjectData}
                  createProfile={createProfile} // function reference, form will call it with its own payload
                  onCreated={(newProfile: any) => {
                    console.log("Tutor profile created");
                    // You can refetch tutor data here to update UI
                    setTutorProfile(newProfile);
                  }}
                />
              )}
            </div>
          </CardContent>
        </Card>

        <TutorStats stats={stats} />
      </div>
    </div>
  );
}
