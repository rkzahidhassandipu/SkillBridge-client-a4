import { Row } from "@tanstack/react-table";

/* ---------------- USER ---------------- */

export type UserRole = "ADMIN" | "TUTOR" | "STUDENT";
export type UserStatus = "ACTIVE" | "BANNED";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  phone: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UsersTableProps {
  initialUsers: User[];
}


export interface UserRowProps {
  row: Row<User>;
  onUpdateUser: (
    id: string,
    data: { role?: UserRole; status?: UserStatus }
  ) => void;
}

export interface FiltersProps {
  roleFilter: string;
  statusFilter: string;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}



/* ---------------- CATEGORY ---------------- */

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface TutorCategory {
  tutorProfileId: string;
  categoryId: string;
  category: Category;
}

/* ---------------- AVAILABILITY ---------------- */

export interface Availability {
  id: string;
  tutorProfileId: string;
  day: string;
  startTime: string;
  endTime: string;
}

/* ---------------- TUTOR PROFILE ---------------- */

export interface TutorProfileData {
  id: string;
  userId: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  categories: TutorCategory[];
  availabilities: Availability[];
}

/* ---------------- COMPONENT PROPS ---------------- */

export interface TutorProfileProps {
  tutor: TutorProfileData;
  profile: User;
}


export interface UpdateTutorPayload {
  bio?: string;
  pricePerHour?: string | number;
  categories?: string[];
}

export interface UpdateTutorResult {
  success: boolean;
  data?: any;
  message?: string;
}

export interface Stat {
  icon: any;
  value: string | number;
  label: string;
  iconBg: string;
  iconColor: string;
}