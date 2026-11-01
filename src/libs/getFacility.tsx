
export default async function getFacility(id:string){
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
    const response = await fetch(`${API_URL}/facilities/${id}`);
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error ?? `Failed to fetch facility with status: ${response.status}`);
    }
    
    return data as FacilityResponse;
}
