"use client";

import DateReserve from "@/components/DateReserve";
import Button from "@mui/material/Button";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import getUserProfile from "@/libs/getUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";


export default function BookingPage() {
    const { data: session } = useSession();
    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const facilityId = searchParams.get("facility");
    const [bookingData, setBookingData] = useState<BookingSchedule>({
        bookingDate: "",
        startTime: "",
        durationHours: 0.5
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetKey, setResetKey] = useState(0);

    const handleBookingChange = (bookingItem: BookingSchedule) => {
        setBookingData(bookingItem)
    }

    const handleBookingSubmit = async () => {
        setIsSubmitting(true);
        var booking: CreateBookingInput = {
            facility: facilityId ?? "",
            bookingDate: bookingData.bookingDate,
            startTime: bookingData.startTime,
            durationHours: bookingData.durationHours
        }
        if (!session?.user?.token) {
            setError("User is not authenticated. Please log in to book a facility.");
            setIsSubmitting(false);
            return;
        }
        if (!booking.bookingDate || !booking.startTime || !booking.durationHours) {
            setError("Please fill in all required fields.");
            setIsSubmitting(false);
            return;
        }
        try {
            await createBooking(booking, session.user.token);
            alert("Booking successful!");
            setError(null);
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again."
            );
        }
        setIsSubmitting(false);
        setResetKey(prev => prev + 1);
    }


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <h1 className="text-4xl font-bold">Sports Facility Booking</h1>



            <div className="w-fit space-y-2">
                <div className="text-md text-left text-gray-600">Date, Contact Information and Facility</div>
                <DateReserve resetKey={resetKey} onBookingChange={handleBookingChange} />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button
                type="submit"
                name="Book Facility"
                variant="contained"
                onClick={handleBookingSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Booking..." : "Book Facility"}
            </Button>


        </main>

    );
}
