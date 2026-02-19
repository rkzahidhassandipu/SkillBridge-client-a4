"use client";

import { useState, useTransition } from "react";
import { deleteCategory } from "@/actions/categories.actions";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EditCategoryModal from "./Editcategorymodal";
import { toast } from "sonner";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    description?: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

 const handleDelete = () => {
  // Show a toast with custom action buttons instead of native confirm
  toast(
    <div className="flex flex-col gap-2">
      <p>Are you sure you want to delete "{category.name}"?</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => toast.dismiss()} // cancel
        >
          Cancel
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={async () => {
            toast.dismiss(); // close confirmation toast
            setIsDeleting(true);
            startTransition(async () => {
              try {
                await deleteCategory(category.id);
                toast.success(`Category "${category.name}" deleted successfully!`);
                router.refresh();
              } catch (err: any) {
                toast.error(err?.message || "Failed to delete category");
              } finally {
                setIsDeleting(false);
              }
            });
          }}
        >
          Delete
        </button>
      </div>
    </div>,
    { duration: 5000 }
  );
};


  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        {/* Category Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-6 min-h-[20px]">
          {category.description || "No description"}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Edit Button */}
          <button
            onClick={() => setShowEditModal(true)}
            disabled={isPending}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pencil className="h-4 w-4" />
            <span className="font-medium">Edit</span>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span className="font-medium">Delete</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditCategoryModal
          category={category}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}