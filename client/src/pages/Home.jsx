import { useState } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FeaturedGames from "../components/FeaturedGames";

import { searchGames } from "../services/rawgApi";
import { searchDemoGames } from "../services/demoGameService";

import "../styles/Home.css";

function Home() {
  // Read the mode selected on the landing page.
  const mode =
    localStorage.getItem("gameVaultMode") || "demo";

  // Store the games returned by either the live or demo search.
  const [games, setGames] = useState([]);

  // Track the request so the UI can provide loading feedback.
  const [isLoading, setIsLoading] = useState(false);

  // Store any error message returned during the search request.
  const [error, setError] = useState("");

  // Store the currently selected game filters.
  const [filters, setFilters] = useState({
    genres: "",
    platforms: "",
    dates: "",
    ordering: "",
  });

  // Search either the live RAWG service or local Demo Mode data.
  async function handleSearch(searchTerm) {
    setIsLoading(true);
    setError("");

    try {
      let searchResults;

      if (mode === "demo") {
        searchResults = searchDemoGames(
          searchTerm,
          filters
        );
      } else {
        searchResults = await searchGames(
          searchTerm,
          filters
        );
      }

      setGames(searchResults);
    } catch (requestError) {
      console.error(
        "Unable to search for games:",
        requestError
      );

      setError(
        "Unable to load games. Please try again."
      );

      setGames([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Clear every selected filter.
  function handleResetFilters() {
    setFilters({
      genres: "",
      platforms: "",
      dates: "",
      ordering: "",
    });
  }

  return (
    <main className={`home-page ${mode}`}>
      {/* Clearly identify when the user is viewing Demo Mode. */}
      <section
        className={`mode-banner ${
          mode === "demo" ? "demo-mode" : "live-mode"
        }`}
        aria-label={`Current mode: ${mode}`}
      >
        <span>
          {mode === "demo" ? "DEMO MODE" : "LIVE MODE"}
        </span>
      </section>

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

      {/* Display an error message if the request fails. */}
      {error && <p role="alert">{error}</p>}

      <FeaturedGames games={games} />
    </main>
  );
}

export default Home;