import { env } from "@/env";

export const uploadService = {
  uploadImage: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `${env.NEXT_PUBLIC_IMGBB_UPLOAD_URL}?key=${env.NEXT_PUBLIC_IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error(`Image upload request failed: ${res.statusText}`);
    }

    const result = await res.json();
    console.log("ImgBB response:", result); // 🔍 Debug

    if (!result.success || !result.data?.display_url) {
      throw new Error(result.error?.message || "Image upload failed");
    }

    return result.data.display_url;
  },
};
