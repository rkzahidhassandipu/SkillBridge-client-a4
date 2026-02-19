"use server"; // ✅ make this a server action

import { adminService } from "@/services/admin.service";
import { UserUpdateInput } from "@/types";
import { cookies } from "next/headers";

// server action: get all users
export const getAllUsers = async () => {
    const result = await adminService.getAllUsers();
    return result
}

// server action: update user
export async function updateUserAction(id: string, data: UserUpdateInput) {
  const cookieStore = cookies();
  return adminService.updateUser(id, data, cookieStore.toString());
}
