interface User {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: "member" | "admin";
  createdAt: string;
}

interface RegisterUser {
  name: string;
  email: string;
  tel: string;
  password: string;
  role: "member" | "admin";
}

interface AuthData {
  id: string;
  name: string;
  email: string;
  role: "member" | "admin";
  token: string;
}

interface AuthResponse {
  success: boolean;
  data: AuthData;
}

interface UserResponse {
  success: boolean;
  data: User;
}

interface Facility {
  _id: string;
  name: string;
  sportType: string;
  location: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  hourlyRate: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FacilityResponse {
  success: boolean;
  data: Facility;
}

interface UpdateFacilityInput {
  name?: string;
  sportType?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  capacity?: number;
  hourlyRate?: number;
  isActive?: boolean;
}

interface DeleteFacilityResponse {
  success: boolean;
  data: Record<string, never>;
}

interface FacilityListResponse {
  success: boolean;
  count: number;
  data: Facility[];
}

interface BookingFacility {
  _id: string;
  name: string;
  sportType: string;
  location: string;
  capacity: number;
  hourlyRate: number;
}

interface BookingUser {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: "member" | "admin";
}

interface Booking {
  _id: string;
  facility: BookingFacility;
  user: BookingUser;
  bookingDate: string;
  startTime: string;
  durationHours: number;
  startMinutes: number;
  endMinutes: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateBookingInput {
  facility: string;
  bookingDate: string;
  startTime: string;
  durationHours: number;
}

interface UpdateBookingInput {
  facility?: string;
  bookingDate?: string;
  startTime?: string;
  durationHours?: number;
}

interface BookingSchedule {
  bookingDate: string;
  startTime: string;
  durationHours: number;
};

interface BookingResponse {
  success: boolean;
  data: Booking;
}

interface BookingListResponse {
  success: boolean;
  count: number;
  data: Booking[];
}

interface DeleteBookingResponse {
  success: boolean;
  data: Record<string, never>;
}


