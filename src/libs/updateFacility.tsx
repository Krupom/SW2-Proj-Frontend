export default async function updateFacility(
  facilityId: string,
  facility: UpdateFacilityInput,
  token: string
): Promise<FacilityResponse> {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";

  const response = await fetch(`${apiUrl}/facilities/${facilityId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(facility),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? `Failed to update facility (${response.status})`);
  }

  return data as FacilityResponse;
}
