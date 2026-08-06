// Base URL for the Express backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
// Send a login request to the authentication API.
export async function loginUser(credentials) {

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(credentials),

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed.");
    }

    return data;
}

// Send a registration request to the authentication API.
export async function registerUser(credentials) {

    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(credentials),

    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
    }

    return data;
}