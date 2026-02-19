"use client";

import { CiCircleRemove } from "react-icons/ci";

interface CategoryBadgeProps {
  name: string;
  onRemove?: () => void;
}

export default function CategoryBadge({ name, onRemove }: CategoryBadgeProps) {
  return (
    <div className="group flex items-center gap-1 px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full relative">
      <span>{name}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <CiCircleRemove className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
