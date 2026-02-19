"use client";

import { useForm } from "@tanstack/react-form";
import { updateCategory } from "@/actions/categories.actions";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface EditCategoryModalProps {
  category: {
    id: string;
    name: string;
    description?: string;
  };
  onClose: () => void;
}

export default function EditCategoryModal({ category, onClose }: EditCategoryModalProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: category.name,
      description: category.description || "",
    },
    onSubmit: async ({ value }) => {
      const result = await updateCategory(category.id, {
        name: value.name,
        description: value.description,
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        form.reset();
        router.refresh();
        onClose();
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="p-6 space-y-4"
        >
          {/* Name Field */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => (!value ? "Category name is required" : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor="edit-category-name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  id="edit-category-name"
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {field.state.meta.errors?.length && (
                  <p className="text-red-600 text-sm">{field.state.meta.errors.join(", ")}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Description Field */}
          <form.Field
            name="description"
            validators={{
              onChange: ({ value }) => (!value ? "Description is required" : undefined),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor="edit-category-description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="edit-category-description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {field.state.meta.errors?.length && (
                  <p className="text-red-600 text-sm">{field.state.meta.errors.join(", ")}</p>
                )}
              </div>
            )}
          </form.Field>

          {/* Action Buttons */}
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {([isSubmitting]) => (
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Category"
                  )}
                </button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </div>
    </div>
  );
}
