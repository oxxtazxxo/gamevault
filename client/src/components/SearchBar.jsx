import "../styles/SearchBar.css";

function SearchBar() {
    return (
        <form className="search-bar">
            <input
                type="search"
                placeholder="Search for a game..."
                aria-label="Search for a game"
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;