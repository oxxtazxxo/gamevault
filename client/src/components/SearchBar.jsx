import "../styles/SearchBar.css";
import { useState } from "react";

function SearchBar({ onSearch, isLoading}) {

    // Store the current value typed into the search input
    const [searchTerm, setSearchTerm] = useState("");

    // Prevent the form from refreshing the page and send the search term to Home.
    function handleSubmit(event) {
        event.preventDefault();
        onSearch(searchTerm);
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Search for a game..."
                aria-label="Search for a game"
                value={searchTerm}
                
                // Update the search term whenever the user types.
                onChange={(event) => setSearchTerm(event.target.value)}
            />

            {/* Show feedback while the API request is running. */}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Searching..." : "Search"}
            </button>
        </form>
    );
}

export default SearchBar;