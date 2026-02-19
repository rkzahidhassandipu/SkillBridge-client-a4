import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;
interface CategoryInput {
  name: string;
  description?: string;
}

export const categoriesService = {

  createCategory: async (
    data: { name: string; description?: string },
    cookie?: string,
  ) => {
    try {
      const url = new URL(`${API_URL}/api/categories`);

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          error: { message: errorData.message || "Failed to create category" },
        };
      }

      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  addCategories: async (userId: string, newCategoryIds: string[], cookie?: string) => {
    try {
      const res = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify({ categoryIds: newCategoryIds }),
      });

      const data = await res.json();

      if (!res.ok) return { data: null, error: data.message || "Failed to add categories" };

      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message || "Something went wrong" };
    }
  },

  getCategories: async () => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/categories`);

      const res = await fetch(url.toString(), {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (res.status === 401) {
        return { data: null, error: { message: "Unauthorized" } };
      }

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch categories" } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  updateCategory: async (
    id: string,
    data: CategoryInput,   
    cookie?: string
  ) => {
    try {
      // Correct route
      const url = new URL(`${API_URL}/api/${id}`);

      const res = await fetch(url.toString(), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { data: null, error: { message: errorData.message || "Failed to update category" } };
      }

      const responseData = await res.json();
      return { data: responseData, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },


  deleteCategory: async (id: string, cookie?: string) => {
    try {
      const url = new URL(`${API_URL}/api/${id}`);

      const res = await fetch(url.toString(), {
        method: "DELETE",
        headers: {
          ...(cookie ? { Cookie: cookie } : {}),
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          data: null,
          error: { message: errorData.message || "Failed to delete category" },
        };
      }

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
