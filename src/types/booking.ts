import { Tutor } from "./profile";
import { Category } from "./user";

export interface BookingData {
  tutorId: string;
  categoryId: string;
  date: string;    
  timeSlot: string;  
}

export interface Booking  {
  id: string;              // booking ID
  studentId: string;       // student who booked
  tutorId: string;         // tutor ID
  categoryId: string;      // category ID
  date: string;            // booking date (ISO string)
  timeSlot: string;        // e.g. "18:00-16:00"
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED"; // booking status
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  tutor: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;       // ISO timestamp when booking was created
};


export interface Review {
  id: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number; // 1–5
  comment: string;
  createdAt: string; // ISO date string
}
export interface ReviewSectionProps {
  bookingId: string;
  tutorName: string;
  tutorId: string;
  studentId: string;
  onSubmit?: (data: {
    bookingId: string;
    rating: number;
    comment: string;
  }) => void;
}

export interface CreateReviewPayload {
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number; // 1–5
  comment: string;
}


export interface GetBooking {
  id: string;
  tutorId: string;
  studentId: string;
  categoryId: string;
  date: string;      
  timeSlot: string;   
  status: "COMPLETED" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
  category: {
    id: string;
    name: string;
    description: string | null;
  };
  student: {
    id: string;
    name: string;
    email: string;
  };
}

export type ReviewTutuor = {
  id: string;
  bookingId: string;
  studentId: string;
  tutorId: string;
  rating: number;
  comment: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
};
