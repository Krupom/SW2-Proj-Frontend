export default async function getBooking(
  bookingId: string,
  token: string
): Promise<BookingResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to fetch booking (${response.status})`);
  }

  return data as BookingResponse;
}