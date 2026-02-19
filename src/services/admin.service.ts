import { env } from "@/env";
const API_URL = env.API_URL;

export const adminService = {
  getAllUsers: async (cookie?: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/alluser`, {
        headers: cookie ? { Cookie: cookie } : {},
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

   updateUser: async (id: string, data: { role?: string; status?: string }, cookie?: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { data: null, error: { message: errorData.message || "Failed to update user" } };
      }

      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
