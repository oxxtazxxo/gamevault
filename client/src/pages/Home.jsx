import { useState } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FeaturedGames from "../components/FeaturedGames";
import { searchGames } from "../services/rawgApi";

function Home() {
  // store the games returned by the backend search endpoint
  const [games, setGames] = useState([]);

  // Track the request so the UI can provide loading feedback
  const [isLoading, setIsLoading] = useState(false);

  // store any error message returned during the search request.
  const [error, setError] = useState("");

  // store the currently selected game filters
  const [filters, setFilters] = useState({
    genres: "",
    platforms: "",
    dates: "",
  });

  // request matching games from the express backend
  async function handleSearch(searchTerm) {
    setIsLoading(true);
    setError("");

    try {
      const searchResults = await searchGames(searchTerm, filters);
      setGames(searchResults);
    } catch (requestError) {
      console.error("Unable to search for games:", requestError);
      setError("Unable to load games. Please try again.");
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleResetFilters() {
    setFilters({
      genres: "",
      platforms: "",
      dates: "",
    });
  }

  return (
    <main>
      <Hero />

      <SearchBar
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <FilterBar 
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
      />
      {/* Display an error message if the backend request fails. */}
      {error && <p role="alert">{error}</p>}

      <FeaturedGames games={games} />
    </main>
  );
}

export default Home