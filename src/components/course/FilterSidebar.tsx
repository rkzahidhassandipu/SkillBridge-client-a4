"use client";

import { X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterSection from "./FilterSection";
import { ALL_DAYS, CATEGORY_OPTIONS } from "./Constants";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
  selectedDays: string[];
  toggleDay: (d: string) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  applyFilters: () => void;
}

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  selectedDays,
  toggleDay,
  hasActiveFilters,
  clearFilters,
  applyFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-20">

        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
            <SlidersHorizontal className="h-4 w-4 text-orange-500" />
            Filters
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-gray-400 hover:text-orange-500 flex items-center gap-1 transition-colors"
            >
              <X className="h-3 w-3" /> Clear all
            </button>
          )}
        </div>

        <div className="divide-y divide-gray-100">

          {/* Subject & Category */}
          <FilterSection title="Subject & Category">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full border-gray-200 text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price range">
            <div className="space-y-4">
              <Slider
                min={0}
                max={500}
                step={5}
                value={priceRange}
                onValueChange={(v) => setPriceRange(v as [number, number])}
                className="mt-1"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="text-sm border-gray-200 text-center"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="text-sm border-gray-200 text-center"
                />
              </div>
              <p className="text-xs text-gray-400 text-center font-medium">
                ${priceRange[0]} – ${priceRange[1]} /hr
              </p>
            </div>
          </FilterSection>

          {/* Availability */}
          <FilterSection title="Availability">
            <div className="space-y-2">
              {ALL_DAYS.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                    className="border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <label
                    htmlFor={`day-${day}`}
                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 select-none"
                  >
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </FilterSection>

        </div>

        <Button
          onClick={applyFilters}
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
        >
          Apply Filters
        </Button>
      </div>
    </aside>
  );
}