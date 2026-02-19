import { Availability, Category, TutorCategory, User } from "./user";

export interface ProfileData {
  id: string;
  role: string;
  status: string;
  user: User;
}

export interface CreateTutorInput {
  bio: string;
  pricePerHour: number;
  categories: string[];
}


export interface Prop {
  createProfile: (payload: {
    bio: string;
    pricePerHour: number;
    categories: string[];
  }) => Promise<any>;
  onCreated?: () => void;
  subjectData?: { data: Category[] };
}



export interface Tutor {
  id: string;
  userId: string;
  bio: string;
  pricePerHour: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  user: User;
  categories: TutorCategory[];
  availabilities: Availability[];
}

export interface FilterState {
  categoryId: string;
  minPrice: number | undefined;
  maxPrice: number | undefined;
}

