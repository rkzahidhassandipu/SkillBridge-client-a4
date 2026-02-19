"use server";

import { cookies } from "next/headers";
import { availabilityService } from "@/services/availability.service";

export interface Slot {
  day: string;
  startTime: string;
  endTime: string;
}

export const getAllAvailability = async () => {
  try {
    // ✅ cookies() এখন async
    const cookieStore = await cookies();

    // সব cookie একসাথে পাঠাতে toString()
    const cookieHeader = cookieStore.toString();

    const { data, error } = await availabilityService.getavailability(
      cookieHeader
    );

    if (error) {
      return { success: false, message: error.message, data: null };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong" };
  }
};

export const updateAvailabilityAction = async (slots: Slot[]) => {
  try {
    if (!slots?.length) {
      return { success: false, message: "No slots provided" };
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const data = await availabilityService.updateAvailability(slots, cookieHeader);

    return {
      success: true,
      message: "Availability updated successfully",
      data,
    };
  } catch (error: any) {
    console.error("Availability Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};