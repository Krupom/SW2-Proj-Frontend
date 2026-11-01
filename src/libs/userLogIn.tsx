export default async function userLogIn(email: string, password: string) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
    });
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.error || `Failed to log in with status: ${response.status}`);
    }

    return (responseBody as AuthResponse).data;
}
