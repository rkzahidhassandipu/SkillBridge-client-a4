"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ALL_DAYS, DAY_SHORT } from "./Constants";
import { formatTime } from "./Utils";
import { Availability } from "@/types";

interface AvailabilityPillsProps {
  availabilities: Availability[];
}

export default function AvailabilityPills({ availabilities }: AvailabilityPillsProps) {
  const activeDays = [...new Set(availabilities.map((a) => a.day))];

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-[11px] font-semibold text-gray-500 mr-0.5">
        Availability
      </span>
      {ALL_DAYS.map((day) => {
        const isActive = activeDays.includes(day);
        const slots = availabilities.filter((a) => a.day === day);

        return (
          <div key={day} className="relative group">
            <span
              className={cn(
                "text-[10px] font-bold px-2 py-0.5 rounded border cursor-default select-none",
                isActive
                  ? "border-green-400 text-green-600 bg-green-50"
                  : "border-gray-200 text-gray-300 bg-white"
              )}
            >
              {DAY_SHORT[day]}
            </span>

            {isActive && slots.length > 0 && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col gap-1 bg-gray-900 text-white text-[10px] rounded-lg px-2.5 py-2 whitespace-nowrap z-20 shadow-xl pointer-events-none">
                {slots.map((s) => (
                  <span key={s.id} className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 text-orange-400" />
                    {formatTime(s.startTime)} – {formatTime(s.endTime)}
                  </span>
                ))}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}