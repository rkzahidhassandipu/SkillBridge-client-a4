import { env } from "@/env";
import { Tutor } from "@/types";
import { cookies } from "next/headers"; // Import cookies

const API_URL = env.API_URL;

export const profileService = {
  getProfile: async () => {
    try {
      // 1. Get the cookies from the current request
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/profile/me`);

      // 2. Add the cookies to the fetch config
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      const res = await fetch(url.toString(), config);

      // Handle unauthorized explicitly
      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getTutorUser: async () => {
    try {
      // 1. Get the cookies from the current request
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/profile/tutorsUser`);

      // 2. Add the cookies to the fetch config
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      const res = await fetch(url.toString(), config);

      // Handle unauthorized explicitly
      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  getTutorall: async (): Promise<{
    data: any | null;
    error: { message: string } | null;
  }> => {
    try {
      // 1. Get cookies
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/profile/tutors`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  tutorProfile: async () => {
    try {
      // 1. Get the cookies from the current request
      const cookieStore = await cookies();

      const url = new URL(`${API_URL}/profile`);

      // 2. Add the cookies to the fetch config
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      const res = await fetch(url.toString(), config);

      // Handle unauthorized explicitly
      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ✅ New single tutor by ID
  getTutorById: async (tutorId: string) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/profile/tutor/${tutorId}`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data: data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ---------------- UPDATE PROFILE ----------------
  updateProfile: async (payload: {
    name?: string;
    phone?: string;
    image?: string;
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/profile/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Update failed" } };
    }
  },
  updateProfileTutor: async (payload: {
    bio: string;
    pricePerHour: number;
    categories: string[];
  }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Update failed" } };
    }
  },

  createTutorProfile: async (payload: {
    bio: string;
    pricePerHour: number;
    categoryIds: string[];
  }) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/profile`);

      const cookieHeader = cookieStore.toString();

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        return {
          data: null,
          error: {
            message: errorData.message || "Failed to create tutor profile",
          },
        };
      }

      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
