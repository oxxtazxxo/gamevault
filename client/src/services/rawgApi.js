const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Search the backend for games matching the user's query and filters.
// Return only the list of RAWG game results needed by the frontend.
export async function searchGames(
    searchTerm,
    filters = {},
    pageSize = 8
) {
    // Remove accidental whitespace from the user's search.
    const trimmedSearch = searchTerm.trim();

    // Do not send an API request if the search box is empty.
    if (!trimmedSearch) {
        return [];
    }

    // Store the query parameters sent to the Express backend.
    const queryParameters = new URLSearchParams({
        page_size: pageSize.toString(),
    });

    // Add only filters that currently have a selected value.
    if (filters.genres) {
        queryParameters.append("genres", filters.genres);
    }

    if (filters.platforms) {
        queryParameters.append("platforms", filters.platforms);
    }

    if (filters.dates) {
        queryParameters.append("dates", filters.dates);
    }

    if (filters.ordering && filters.ordering !== "relevance") {
    queryParameters.append("ordering", filters.ordering);
    }

    // Build the complete backend request URL.
    const url =
        `${API_BASE_URL}/api/rawg/search/` +
        `${encodeURIComponent(trimmedSearch)}?${queryParameters.toString()}`;

    // Send the request to the Express backend.
    const response = await fetch(url);

    // Throw an error if the backend returns an unsuccessful status code.
    if (!response.ok) {
        throw new Error(`Search failed with status ${response.status}`);
    }

    // Convert the JSON response into a JavaScript object.
    const responseData = await response.json();

    // Return only the array of games needed by the frontend.
    return responseData.data.results;
}