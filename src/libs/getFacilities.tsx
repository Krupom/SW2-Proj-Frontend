
export default async function getFacilities(): Promise<FacilityListResponse> {
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
    const response = await fetch(`${API_URL}/facilities`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error ?? `Failed to fetch facilities with status: ${response.status}`);
    }

    
    return data as FacilityListResponse;
}
