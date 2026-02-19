"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import AddCategoryModal from "./Addcategorymodal";

export default function CategoryForm() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <Plus className="h-5 w-5" />
        <span className="font-medium">Add Category</span>
      </button>

      {showModal && <AddCategoryModal onClose={() => setShowModal(false)} />}
    </>
  );
}