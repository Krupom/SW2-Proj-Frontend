"use client"
import getBookingList from "@/libs/getBookingList";
import updateBooking from "@/libs/updateBooking";
import deleteBooking from "@/libs/deleteBooking";
import DateReserve from "@/components/DateReserve";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function BookingList() {
    const { data: session } = useSession();
    const [bookingList, setBookingList] = useState<Booking[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);
    const [updateError, setUpdateError] = useState<string | null>(null);
    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [updatedSchedule, setUpdatedSchedule] = useState<BookingSchedule>({
        bookingDate: "",
        startTime: "",
        durationHours: 0.5,
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60).toString().padStart(2, "0");
        const mins = (minutes % 60).toString().padStart(2, "0");
        return `${hours}:${mins}`;
    };

    const openEditPopup = (booking: Booking) => {
        setUpdatedSchedule({
            bookingDate: booking.bookingDate.slice(0, 10),
            startTime: booking.startTime,
            durationHours: booking.durationHours,
        });
        setEditingBooking(booking);
        setUpdateError(null);
    };

    const handleUpdateBooking = async () => {
        if (!editingBooking || !session?.user?.token) return;

        if (!updatedSchedule.bookingDate || !updatedSchedule.startTime) {
            setUpdateError("Please choose a date and start time.");
            return;
        }

        setUpdateError(null);
        setIsUpdating(true);
        try {
            const result = await updateBooking(
                editingBooking._id,
                updatedSchedule,
                session.user.token
            );
            setBookingList((bookings) =>
                bookings.map((booking) =>
                    booking._id === result.data._id ? result.data : booking
                )
            );
            setEditingBooking(null);
            setUpdateError(null);
        } catch (error: unknown) {
            setUpdateError(error instanceof Error ? error.message : "Failed to update booking.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDeleteBooking = async (bookingId: string) => {
        if (!session?.user?.token) return;
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        setDeletingBookingId(bookingId);
        try {
            await deleteBooking(bookingId, session.user.token);
            setBookingList((bookings) => bookings.filter((booking) => booking._id !== bookingId));
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Failed to delete booking.");
        } finally {
            setDeletingBookingId(null);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            if (session?.user?.token) {
                try {
                    const bookings = await getBookingList(session.user.token);
                    setBookingList(bookings.data);
                } catch (error: unknown) {
                    setError(error instanceof Error ? error.message : "Failed to fetch bookings.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBookings();
    }, [session]);

    return (
        <div className="w-full max-w-3xl space-y-2">
            {isLoading && <div>Loading bookings...<LinearProgress /></div>}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && bookingList.length === 0 ? (
                <p>No Facility Booking</p>
            ) : null}
            {bookingList.map((booking) => (
                <div
                    className="space-y-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
                    key={booking._id}
                >
                    <div className="relative grid grid-cols-1 gap-x-5 gap-y-3 pb-14 sm:grid-cols-3">
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">Facility</p>
                            <Link
                                href={`/facilities/${booking.facility._id}`}
                                className="block truncate font-semibold !text-blue-700 !underline hover:!text-blue-900"
                            >
                                {booking.facility.name}
                            </Link>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">Sport</p>
                            <p className="truncate text-sm text-slate-700">{booking.facility.sportType}</p>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-400">User</p>
                            <p className="truncate text-sm text-slate-700">{booking.user.name}</p>
                        </div>
                        <div className="min-w-0 sm:col-span-3">
                            <p className="text-xs font-medium text-slate-400">Location</p>
                            <p className="break-words text-sm text-slate-700">{booking.facility.location}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">Date</p>
                            <p className="text-sm font-medium text-slate-700">{booking.bookingDate.slice(0, 10)}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">Time</p>
                            <p className="whitespace-nowrap text-sm text-slate-700">
                                {formatTime(booking.startMinutes)} - {formatTime(booking.endMinutes)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">Duration</p>
                            <p className="text-sm text-slate-700">{booking.durationHours} hours</p>
                        </div>
                        <div className="absolute bottom-0 right-0 flex gap-2">
                            <Button variant="contained" onClick={() => openEditPopup(booking)}>
                                Edit
                            </Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteBooking(booking._id)} disabled={deletingBookingId === booking._id}>
                                {deletingBookingId === booking._id ? "Deleting..." : "Delete"}
                            </Button>
                        </div>
                    </div>
                    {editingBooking?._id === booking._id && (
                        <div className="border-t border-slate-200 pt-3">
                            <p className="mb-2 font-medium text-slate-700">Update Booking</p>
                            <DateReserve
                                resetKey={0}
                                initialSchedule={{
                                    bookingDate: editingBooking.bookingDate.slice(0, 10),
                                    startTime: editingBooking.startTime,
                                    durationHours: editingBooking.durationHours,
                                }}
                                onBookingChange={setUpdatedSchedule}
                            />
                            {updateError && <p role="alert" className="mt-2 text-sm text-red-600">{updateError}</p>}
                            <div className="mt-3 flex justify-end gap-2">
                                <Button onClick={() => { setEditingBooking(null); setUpdateError(null); }} disabled={isUpdating}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={handleUpdateBooking} disabled={isUpdating}>
                                    {isUpdating ? "Updating..." : "Update Booking"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
