"use server";

import { uploadService } from "@/services/upload.service";


export async function uploadImageAction(file: File) {
  try {
    const imageUrl = await uploadService.uploadImage(file);

    return {
      success: true,
      url: imageUrl,
    };
  } catch (error: any) {
    console.error("Upload Action Error:", error);
    return {
      success: false,
      message: error.message || "Image upload failed",
    };
  }
}
