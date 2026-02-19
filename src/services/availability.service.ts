import { env } from "@/env";
import { Slot } from "@/types";

const API_URL = env.API_URL;

export const availabilityService = {
  getavailability: async (cookie?: string) => {
    try {
      const res = await fetch(`${API_URL}/availability`, {
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

  updateAvailability: async (slots: Slot[], cookie?: string) => {
    const res = await fetch(`${API_URL}/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: JSON.stringify({ slots }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update availability");
    }

    return result;
  },
};
