export default async function userRegister(user: RegisterUser): Promise<AuthData> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const response = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.error || `Failed to register with status: ${response.status}`);
    }

    return (responseBody as AuthResponse).data;
}
