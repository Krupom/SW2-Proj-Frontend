export default async function updateBooking(
  bookingId: string,
  booking: UpdateBookingInput,
  token: string
): Promise<BookingResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(booking),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to update booking (${response.status})`);
  }

  return data as BookingResponse;
}
