export default async function createBooking(
    booking: CreateBookingInput,
    token: string
) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                facility: booking.facility,
                bookingDate: booking.bookingDate,
                startTime: booking.startTime,
                durationHours: booking.durationHours,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error ?? "Failed to create booking");
    }

    return data;

}