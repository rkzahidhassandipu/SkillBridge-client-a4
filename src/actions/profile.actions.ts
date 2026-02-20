"use server";
import { profileService } from "@/services/profile.service";
import { UpdateTutorPayload, UpdateTutorResult } from "@/types";

export const getProfile = async () => {
  const result = await profileService.getProfile();
  return result;
};
export const getTutorUser = async () => {
  const result = await profileService.getTutorUser();
  return result;
};

// ✅ New single tutor action
export const getSingleTutor = async (id: string) => {
  const result = await profileService.getTutorById(id);
  return result;
};

export const getTutorAll = async () => {
  const result = await profileService.getTutorall();
  return result;
};

export const getTutor = async () => {
  const result = await profileService.tutorProfile();
  return result;
};

export const updateProfile = async (data: {
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
}) => {
  try {
    const filteredData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      image: data.image,
    };

    console.log(filteredData);

    const result = await profileService.updateProfile(filteredData);

    return { success: true, data: result };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update profile",
    };
  }
};
export const updateProfileTutor = async (
  data: UpdateTutorPayload,
): Promise<UpdateTutorResult> => {
  try {
    // Prepare filtered data: convert pricePerHour to number if present
    const filteredData = {
      bio: data.bio || "", // default to empty string if undefined
      pricePerHour:
        data.pricePerHour !== undefined
          ? typeof data.pricePerHour === "string"
            ? parseFloat(data.pricePerHour)
            : data.pricePerHour
          : 0, // default to 0 if undefined
      categories: data.categories || [], // default to empty array
    };

    console.log("Filtered Payload:", filteredData);

    const result = await profileService.updateProfileTutor(filteredData);

    return { success: true, data: result };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Failed to update profile",
    };
  }
};

type CreateTutorInput = {
  bio: string;
  pricePerHour: string | number;
  categoryIds: string[];
};

export const createTutorProfileAction = async (payload: CreateTutorInput) => {
  try {
    const formattedPayload = {
      bio: payload.bio,
      pricePerHour: Number(payload.pricePerHour),
      categoryIds: payload.categoryIds,
    };
    const { data, error } =
      await profileService.createTutorProfile(formattedPayload);

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Action error:", err);
    return { success: false, message: "Something went wrong" };
  }
};
