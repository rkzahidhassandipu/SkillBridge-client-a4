
'use server';

import { cookies } from "next/headers";
import { categoriesService } from "@/services/categories.service";


interface CategoryInput {
  name: string;
  description?: string;
}

export const createCategory = async (data: CategoryInput) => {
  const cookieStore = await cookies();
  return categoriesService.createCategory(data, cookieStore.toString());
};


export const getCategories = async () => {
    const result = await categoriesService.getCategories();
    return result
}

export const addTutorCategories = async (userId: string, categoryIds: string[]) => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const { data, error } = await categoriesService.addCategories(
      userId,
      categoryIds,
      cookieHeader
    );

    if (error) return { success: false, message: error, data: null };

    return { success: true, data };
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong", data: null };
  }
};

export const updateCategory = async (id: string, data: CategoryInput) => {
  const cookieStore = await cookies();
  return categoriesService.updateCategory(id, data, cookieStore.toString());
};

// Delete
export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  return categoriesService.deleteCategory(id, cookieStore.toString());
};