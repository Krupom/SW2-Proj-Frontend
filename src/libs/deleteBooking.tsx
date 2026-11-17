export default async function deleteBooking(
  bookingId: string,
  token: string
): Promise<DeleteBookingResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/bookings/${bookingId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to delete booking (${response.status})`);
  }

  return data as DeleteBookingResponse;
}
