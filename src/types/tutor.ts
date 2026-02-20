import { Availability, Category, User } from "./user";

export interface Instructor {
  id: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  availabilities: Availability[];
  categories: Category[];
  user: User;
  userId: string;
}