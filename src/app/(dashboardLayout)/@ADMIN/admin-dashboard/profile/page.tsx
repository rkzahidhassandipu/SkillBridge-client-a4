import { getProfile } from "@/actions/profile.actions";
import ProfileView from "@/components/dashboard/profile/ProfileView";



const Profile = async () => {

  const result = await getProfile();
  
  if (result.error || !result.data) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <p className="text-center text-red-600">
            {result.error?.message || "Profile not found"}
        </p>
      </div>
    );
  }
  return <ProfileView profile={result.data} />;
};

export default Profile;