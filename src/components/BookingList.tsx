"use client"
import getBookingList from "@/libs/getBookingList";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function BookingList() {
    const { data: session } = useSession();
    const [bookingList, setBookingList] = useState<Booking[]>([]);
    const [error, setError] = useState<string | null>(null);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
        const mins = (minutes % 60).toString().padStart(2, "0");
        return `${hours}:${mins}`;
    };

    useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.token) {
                try {
                    const bookings = await getBookingList(session.user.token);
                    setBookingList(bookings.data);
                } catch (error: unknown) {
                    setError(error instanceof Error ? error.message : "Failed to fetch bookings.");
                }
            }
        };

        fetchBookings();
    }, [session]);

    return (
        <div className="w-full flex flex-col items-center space-y-4">
            {error && <p className="text-red-500">{error}</p>}
            {bookingList.length === 0 ? (
                <p>No Facility Booking</p>
            ) : null}
                {bookingList.map((booking) => (
                    <div className="w-full bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={booking._id}>
                        <div className="text-xl py-2">Facility: {booking.facility.name}</div>
                        <div className="text-sm">Sport: {booking.facility.sportType}</div>
                        <div className="text-sm">Location: {booking.facility.location}</div>
                        <div className="text-sm">Date: {booking.bookingDate.slice(0, 10)}</div>
                        <div className="text-sm">
                            Time: {formatTime(booking.startMinutes)} - {formatTime(booking.endMinutes)}
                        </div>
                        <div className="text-sm">Duration: {booking.durationHours} hours</div>
                    </div>
                ))}
        </div>
    );
}
