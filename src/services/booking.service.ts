import { env } from "@/env";
import { Booking } from "@/types";
import { cookies } from "next/headers";
export interface BookingResponse {
  success: boolean;
  data: Booking[];
}

const API_URL = env.API_URL;
export const bookingService = {
  getBookings: async (): Promise<{
    data: Booking[] | null;
    error: { message: string } | null;
  }> => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/booking`, {
        headers: {
          Cookie: cookieStore.toString(), // ensure this is a string
        },
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      const json: BookingResponse = await res.json();
      return { data: json.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  createBooking: async (
    payload: {
      tutorId: string;
      categoryId: string;
      date: string;
      timeSlot: string;
    },
    cookieHeader?: string,
  ) => {
    try {
      const res = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: {
            message: responseData.message || "Failed to create booking",
          },
        };
      }

      return {
        data: responseData.data,
        error: null,
      };
    } catch (error) {
      console.error("Create booking error:", error);
      return {
        data: null,
        error: { message: "Something went wrong" },
      };
    }
  },

  getTutorBooking: async (cookie?: string) => {
    try {
      const res = await fetch(`${API_URL}/booking/tutor`, {
        headers: cookie ? { Cookie: cookie } : {},
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      if (!res.ok) {
        return {
          data: null,
          error: { message: `Server returned ${res.status}` },
        };
      }

      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await res.json();
        return { data, error: null };
      } else {
        const text = await res.text();
        return { data: null, error: { message: "Expected JSON but got HTML" } };
      }
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  updateBookingStatus: async (
    bookingId: string,
    status: "COMPLETED" | "CANCELLED",
    cookie?: string
  ) => {
    const res = await fetch(`${API_URL}/booking/${bookingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}), // attach cookie
      },
      body: JSON.stringify({ status }),
    });

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) return await res.json();

    const text = await res.text();
    console.error("Non-JSON response:", text);
    return { success: false, message: "Invalid response from server" };
  }
};
