import { NextPage } from "next";
import {
  getTutor,
  getProfile,
  createTutorProfileAction,
} from "@/actions/profile.actions";
import TutorProfile from "@/components/dashboard/tutorProfile/TutorProfile";
import { TutorProfileData, User } from "@/types";
import { getCategories } from "@/actions/categories.actions";
const Page = async () => {
  const tutorRes = await getTutor();
  const profileRes = await getProfile();
  const response = await getCategories();

 
  if (!tutorRes.data || tutorRes.error) {
    return <div>Failed to load tutor data</div>;
  }

  // Profile type guard
  if (!profileRes.data || profileRes.error) {
    return <div>Failed to load profile data</div>;
  }

  const tutor: TutorProfileData = tutorRes.data;
  const profile: User = profileRes.data;
  const subjectData = response?.data || [];
  return (
    <div>
      <TutorProfile
        tutor={tutor}
        profile={profile}
        subjectData={subjectData}
        createProfile={createTutorProfileAction}
      />
    </div>
  );
};

export default Page;
