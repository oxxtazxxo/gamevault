// Base URL for the deployed Express backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Read the saved JWT so protected favorite routes can identify the user.
function getAuthToken() {
    return localStorage.getItem("token");
}

// Load all favorites for the currently logged-in user.
export async function getFavorites() {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to load favorites."
        );
    }

    return data;
}

// Save one game to the current user's favorites.
export async function addFavorite(game) {
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/favorites`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
            rawgId: game.id,
            title: game.title,
            releaseDate: game.releaseDate,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to add favorite."
        );
    }

    return data;
}

// Remove one favorite using the favorite document's MongoDB ID.
export async function removeFavorite(favoriteId) {
    const token = getAuthToken();

    const response = await fetch(
        `${API_BASE_URL}/api/favorites/${favoriteId}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Unable to remove favorite."
        );
    }

    return data;
}