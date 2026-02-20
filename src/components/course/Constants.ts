import { Tutor, TutorDemo } from "@/types";


export const ALL_DAYS = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
];

export const DAY_SHORT: Record<string, string> = {
  Monday: "MON", Tuesday: "TUE", Wednesday: "WED",
  Thursday: "THU", Friday: "FRI", Saturday: "SAT", Sunday: "SUN",
};

export const CATEGORY_OPTIONS = [
  { value: "all", label: "All categories" },
  { value: "Prisma", label: "Prisma" },
  { value: "Next.js", label: "Next.js" },
  { value: "React JSX", label: "React JSX" },
  { value: "Javascript", label: "Javascript" },
  { value: "TypeScript", label: "TypeScript" },
];
