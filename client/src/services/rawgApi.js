const API_BASE_URL = "http://localhost:5000";

// Searches the backend for games matching the user's query
// and returns the list of results from the RAWG API
export async function searchGames(searchTerm, pageSize = 8) {

    // Remove any accidental whitespace from the user's search.
    const trimmedSearch = searchTerm.trim();

    // Don't send an API request if the search box is empty.
    if(!trimmedSearch) {
        return [];
    }

    // Build the request URL for the backend search endpoint.
    const url = `${API_BASE_URL}/api/rawg/search/${encodeURIComponent(trimmedSearch)}` + `?page_size=${pageSize}`;

    // Send the request to the Express backend.
    const response = await fetch(url);

    // Throw an error if the backend returns an unsuccessful status code.
    if(!response.ok) {
        throw new Error (`Search failed with status ${response.status}`);
    }

    // Convert the JSON response into a JavaScript object.
    const responseData = await response.json();

    // Return only the array of games needed by the frontend.
    return responseData.data.results;
}