export default async function createFacility(
    facility: {
        name: string;
        sportType: string;
        location: string;
        capacity: number;
        hourlyRate: number;
        isActive?: boolean;
    },
    token: string
) {
    const apiUrl =
        process.env.NEXT_PUBLIC_API_URL ??
        "http://localhost:5000/api/v1";

    const response = await fetch(`${apiUrl}/facilities`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(facility),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.error ?? "Could not create facility.");
    }

    return responseBody.data;
}