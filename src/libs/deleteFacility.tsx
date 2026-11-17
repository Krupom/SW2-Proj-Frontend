export default async function deleteFacility(
  facilityId: string,
  token: string
): Promise<DeleteFacilityResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/facilities/${facilityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to delete facility (${response.status})`);
  }

  return data as DeleteFacilityResponse;
}
