"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FilterState, Tutor } from "@/types";
import TutorCard from "./TutorCard";
import SearchBar from "./SearchBar";
import FilterSidebar from "./FilterSidebar";
import ResultsToolbar from "./Resultstoolbar";
import TutorCardSkeleton from "./TutorCardSkeleton";

// ⬇️ Set to false when your real API is ready
const IS_PREVIEW = true;

interface TutorsPageProps {
  tutorAll: Tutor[];
}
export default function TutorsPage({ tutorAll }: TutorsPageProps) {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("price");

  const tutorAllData = tutorAll;
  // ── Filter state ──────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Sent to API (only updates on Apply / Search now click)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>({
    categoryId: "",
    minPrice: undefined,
    maxPrice: undefined,
  });

  // ── Data fetching ─────────────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
  queryKey: ["tutors", appliedFilters],
  queryFn: async () => ({ success: true as const, data: tutorAllData }),
});


  // ── Client-side filtering ─────────────────────────────────────────────────
  const tutors = (tutorAllData ?? []).filter((t: Tutor) => {
  const q = searchQuery.toLowerCase();

  const matchSearch =
    !q ||
    t.user.name.toLowerCase().includes(q) ||
    t.bio.toLowerCase().includes(q) ||
    t.categories.some((c) => c.category.name.toLowerCase().includes(q));

  const matchCategory =
    selectedCategory === "all" ||
    t.categories.some(
      (c) => c.category.name.toLowerCase() === selectedCategory.toLowerCase()
    );

  const matchDays =
    selectedDays.length === 0 ||
    selectedDays.some((d) => t.availabilities.some((a) => a.day === d));

  const matchPrice =
    t.pricePerHour >= priceRange[0] && t.pricePerHour <= priceRange[1];

  return matchSearch && matchCategory && matchDays && matchPrice;
});


  // ── Sorting ───────────────────────────────────────────────────────────────
  const sorted = [...tutors].sort((a, b) => {
    if (sortBy === "price") return a.pricePerHour - b.pricePerHour;
    if (sortBy === "price_desc") return b.pricePerHour - a.pricePerHour;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.totalReviews - a.totalReviews;
    return 0;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const applyFilters = () => {
    setAppliedFilters({
      categoryId: selectedCategory === "all" ? "" : selectedCategory,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 500 ? priceRange[1] : undefined,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange([0, 500]);
    setSelectedDays([]);
    setSearchQuery("");
    setAppliedFilters({ categoryId: "", minPrice: undefined, maxPrice: undefined });
  };

  const toggleDay = (d: string) =>
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );

  const hasActiveFilters =
    (selectedCategory !== "all") ||
    selectedDays.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 500;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50/70">

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearch={applyFilters}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar */}
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
          applyFilters={applyFilters}
        />

        {/* Main content */}
        <main className="flex-1 min-w-0">

          <ResultsToolbar
            count={sorted.length}
            isLoading={isLoading}
            sortBy={sortBy}
            setSortBy={setSortBy}
            viewMode={viewMode}
            setViewMode={setViewMode}
            selectedDays={selectedDays}
            toggleDay={toggleDay}
          />

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => <TutorCardSkeleton key={i} />)}
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <p className="text-lg font-semibold text-gray-600">Something went wrong</p>
              <p className="text-sm mt-1 text-gray-400">
                Please check your connection and try again.
              </p>
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 mx-auto mb-3 text-gray-200" />
              <p className="text-lg font-semibold text-gray-600">No tutors found</p>
              <p className="text-sm mt-1 text-gray-400">
                Try adjusting your search or filters.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-4 text-orange-500 border-orange-200 hover:bg-orange-50"
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 xl:grid-cols-2 gap-4"
                  : "flex flex-col gap-4"
              )}
            >
              {sorted.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}