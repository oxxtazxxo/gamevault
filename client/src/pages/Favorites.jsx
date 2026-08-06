import { useEffect, useState } from "react";

import "../styles/Favorites.css";

import {
  getFavorites,
  removeFavorite,
} from "../services/favoritesApi";

function Favorites() {
  // Store the logged-in user's saved favorites.
  const [favorites, setFavorites] = useState([]);

  // Track the request while favorites are loading.
  const [isLoading, setIsLoading] = useState(true);

  // Store any message returned when the request fails.
  const [error, setError] = useState("");

  // Load the user's favorites when the page opens.
  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getFavorites();
        setFavorites(data);
      } catch (requestError) {
        console.error(requestError);
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadFavorites();
  }, []);

  // Remove one favorite and immediately update the page.
  async function handleRemoveFavorite(favoriteId) {
    try {
      await removeFavorite(favoriteId);

      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (favorite) => favorite._id !== favoriteId
        )
      );
    } catch (requestError) {
      console.error(requestError);
      alert(requestError.message);
    }
  }

  return (
    <main className="favorites-page">
      <section className="favorites-content">
        <header className="favorites-header">
          <h1>Favorites</h1>

          <p>
            Your saved games are stored here for easy access.
          </p>
        </header>

        {isLoading && <p>Loading favorites...</p>}

        {error && <p role="alert">{error}</p>}

        {!isLoading &&
          !error &&
          favorites.length === 0 && (
            <p>
              You have not added any favorite games yet.
            </p>
          )}

        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <article
              key={favorite._id}
              className="favorite-card"
            >
              <h2>{favorite.title}</h2>

              <p>
                Release Date:{" "}
                {favorite.releaseDate ||
                  "Release date unavailable"}
              </p>

              <button
                type="button"
                onClick={() =>
                  handleRemoveFavorite(favorite._id)
                }
              >
                Remove Favorite
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Favorites;