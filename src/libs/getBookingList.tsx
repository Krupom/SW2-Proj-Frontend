export default async function getBookingList(
  token: string
): Promise<BookingListResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to fetch booking (${response.status})`);
  }

  return data as BookingListResponse;
}