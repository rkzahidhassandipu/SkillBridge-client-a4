"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Stat } from "@/types";
import { IconType } from "react-icons";



interface TutorStatsProps {
  stats: Stat[];
}

export default function TutorStats({ stats }: TutorStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => (
        <Card
          key={idx}
          className="border-none shadow-lg transition-transform hover:scale-105"
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div
              className={`h-12 w-12 flex items-center justify-center rounded-xl ${stat.iconBg}`}
            >
              <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
