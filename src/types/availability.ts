export interface Slot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

export interface Props {
  onSuccess: (slot: {
    day: string;
    startTime: string;
    endTime: string;
  }) => void;
}


export interface Subject {
  id: string;
  name: string;
  description: string | null;
}