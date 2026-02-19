"use client";

import { LayoutList, LayoutGrid, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ResultsToolbarProps {
  count: number;
  isLoading: boolean;
  sortBy: string;
  setSortBy: (v: string) => void;
  viewMode: "list" | "grid";
  setViewMode: (v: "list" | "grid") => void;
  selectedDays: string[];
  toggleDay: (d: string) => void;
}

export default function ResultsToolbar({
  count,
  isLoading,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  selectedDays,
  toggleDay,
}: ResultsToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
      <h2 className="text-xl font-bold text-gray-800">
        {isLoading ? "..." : count}{" "}
        <span className="font-normal text-gray-400 text-base">
          {count === 1 ? "tutor" : "tutors"} found
        </span>
      </h2>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Active day chips */}
        {selectedDays.map((d) => (
          <span
            key={d}
            className="text-xs bg-orange-50 text-orange-600 border border-orange-200 rounded-full px-2.5 py-0.5 flex items-center gap-1"
          >
            {d}
            <button
              onClick={() => toggleDay(d)}
              className="hover:text-red-400 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        {/* Sort */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-44 border-gray-200 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Price: Low → High</SelectItem>
            <SelectItem value="price_desc">Price: High → Low</SelectItem>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="reviews">Most Reviews</SelectItem>
          </SelectContent>
        </Select>

        {/* View mode toggle */}
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 transition-colors",
              viewMode === "list"
                ? "bg-orange-50 text-orange-500"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutList className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 transition-colors",
              viewMode === "grid"
                ? "bg-orange-50 text-orange-500"
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}