import { Tutor } from "@/types";


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

export const MOCK_TUTORS: Tutor[] = [
  {
    id: "659d37be-7aae-4991-8e10-b9a54db419bd",
    userId: "0DB82xVWaCsqgwzcPCbF5GHUHG8ooa3H",
    bio: "Experienced Math Tutor with over 5 years of teaching. I specialize in making complex concepts approachable and easy to understand for all skill levels.",
    pricePerHour: 20,
    rating: 4.5,
    totalReviews: 12,
    createdAt: "2026-02-02T03:22:00.064Z",
    user: {
      id: "0DB82xVWaCsqgwzcPCbF5GHUHG8ooa3H",
      name: "John Doe",
      email: "john.doe6@example.com",
      image: "https://i.ibb.co/dZZhRsR/Screenshot-16.png",
      phone: "+1 0231 4554 452",
    },
    categories: [
      { tutorProfileId: "659d37be", categoryId: "1", category: { id: "1", name: "Prisma", description: null } },
      { tutorProfileId: "659d37be", categoryId: "2", category: { id: "2", name: "Next.js", description: null } },
      { tutorProfileId: "659d37be", categoryId: "3", category: { id: "3", name: "React JSX", description: "asd" } },
      { tutorProfileId: "659d37be", categoryId: "4", category: { id: "4", name: "Javascript", description: "asdfftzas" } },
    ],
    availabilities: [
      { id: "1", tutorProfileId: "659d37be", day: "Monday", startTime: "10:00", endTime: "12:00" },
      { id: "2", tutorProfileId: "659d37be", day: "Wednesday", startTime: "14:00", endTime: "16:00" },
      { id: "3", tutorProfileId: "659d37be", day: "Wednesday", startTime: "18:00", endTime: "20:00" },
      { id: "4", tutorProfileId: "659d37be", day: "Thursday", startTime: "22:28", endTime: "23:29" },
      { id: "5", tutorProfileId: "659d37be", day: "Friday", startTime: "03:08", endTime: "14:08" },
      { id: "6", tutorProfileId: "659d37be", day: "Sunday", startTime: "02:06", endTime: "03:10" },
    ],
  },
  {
    id: "aab12c44-1234-5678-abcd-ef0123456789",
    userId: "user2",
    bio: "Full-stack developer and passionate teacher. I love breaking down complex web technologies into simple, digestible lessons for learners at all levels.",
    pricePerHour: 45,
    rating: 4.8,
    totalReviews: 34,
    createdAt: "2026-01-15T10:00:00.000Z",
    user: {
      id: "user2",
      name: "Sarah Williams",
      email: "sarah.w@example.com",
      image: "https://i.pravatar.cc/150?img=47",
      phone: "+1 555 123 4567",
    },
    categories: [
      { tutorProfileId: "aab12c44", categoryId: "2", category: { id: "2", name: "Next.js", description: null } },
      { tutorProfileId: "aab12c44", categoryId: "3", category: { id: "3", name: "React JSX", description: null } },
      { tutorProfileId: "aab12c44", categoryId: "5", category: { id: "5", name: "TypeScript", description: null } },
    ],
    availabilities: [
      { id: "7", tutorProfileId: "aab12c44", day: "Monday", startTime: "09:00", endTime: "17:00" },
      { id: "8", tutorProfileId: "aab12c44", day: "Tuesday", startTime: "09:00", endTime: "17:00" },
      { id: "9", tutorProfileId: "aab12c44", day: "Friday", startTime: "09:00", endTime: "13:00" },
    ],
  },
  {
    id: "bbc34d55-abcd-efgh-1234-567890abcdef",
    userId: "user3",
    bio: "Database architect and backend specialist. Whether you're just getting started or leveling up, I can help you master SQL, Prisma, and scalable system design.",
    pricePerHour: 60,
    rating: 5.0,
    totalReviews: 8,
    createdAt: "2026-01-28T08:00:00.000Z",
    user: {
      id: "user3",
      name: "Alex Kim",
      email: "alex.kim@example.com",
      image: "https://i.pravatar.cc/150?img=12",
      phone: "+82 10 1234 5678",
    },
    categories: [
      { tutorProfileId: "bbc34d55", categoryId: "1", category: { id: "1", name: "Prisma", description: null } },
      { tutorProfileId: "bbc34d55", categoryId: "6", category: { id: "6", name: "PostgreSQL", description: null } },
      { tutorProfileId: "bbc34d55", categoryId: "7", category: { id: "7", name: "System Design", description: null } },
    ],
    availabilities: [
      { id: "10", tutorProfileId: "bbc34d55", day: "Wednesday", startTime: "18:00", endTime: "21:00" },
      { id: "11", tutorProfileId: "bbc34d55", day: "Saturday", startTime: "10:00", endTime: "16:00" },
      { id: "12", tutorProfileId: "bbc34d55", day: "Sunday", startTime: "10:00", endTime: "14:00" },
    ],
  },
];