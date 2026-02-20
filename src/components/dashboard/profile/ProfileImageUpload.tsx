"use client";

import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Camera } from "lucide-react";
import { toast } from "sonner";
import { updateProfile } from "@/actions/profile.actions";
import { uploadImageAction } from "@/actions/upload.actions";

interface Props {
  imageUrl?: string;
  userId: string;
  initials: string;
  onUpload?: (url: string) => Promise<void>;
  size?: number; // optional, defaults if not provided
}

export default function ProfileImageUpload({ imageUrl, userId, initials, onUpload, size }: Props) {
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const result = await uploadImageAction(file);

      if (!result.success) throw new Error(result.message || "Upload failed");

      const uploadedUrl = result.url;

      // Update profile with new image URL
      await updateProfile({ image: uploadedUrl });

      return uploadedUrl;
    },
    onSuccess: (newUrl) => {
      // Optimistically show the new image immediately
      setLocalPreview(newUrl as string);

      // Refetch user profile so parent query updates
      queryClient.invalidateQueries({ queryKey: ["user", userId] });

      setUploading(false);
      toast.success("Profile image updated");
    },
    onError: (error: any) => {
      setLocalPreview(null);
      setUploading(false);
      toast.error(error.message || "Image update failed");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant preview while uploading
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLocalPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);

    setUploading(true);
    uploadMutation.mutate(file);
  };

  const displayImage = localPreview || imageUrl;

  return (
    <div className="relative w-40 h-40">
      <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
        {displayImage ? (
          <img
            src={displayImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-xl font-semibold text-gray-600">
            {initials}
          </div>
        )}
      </div>

      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-md hover:bg-gray-100 border"
      >
        <Camera className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
}
