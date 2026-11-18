"use client";

import DateReserve from "@/components/DateReserve";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import createBooking from "@/libs/createBooking";
import { useSession } from "next-auth/react";


export default function BookingPage() {
    const { data: session } = useSession();
    const router = useRouter();
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

    useEffect(() => {
        if (!session?.user?.token) {
            router.replace("/api/auth/signin");
        }
    }, [session?.user?.token, router]);

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
        if (!session?.user?.token || session.user.role !== "member") {
            setError("You don't have permission to book a facility.");
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
            setResetKey(prev => prev + 1);
        } catch (error: unknown) {
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again."
            );
        }
        setIsSubmitting(false);
    }


    if (!session?.user?.token) {
        return <main className="p-5 text-center">Redirecting to sign in...</main>;
    }

    if (session.user.role !== "member") {
        return <main className="p-5 text-center">You don't have permission to access this page.</main>;
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
