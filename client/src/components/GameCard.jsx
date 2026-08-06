import "../styles/GameCard.css";
import { addFavorite } from "../services/favoritesApi";

// Reusable card for displaying a single game's summary information.
function GameCard({ id, title, rating, releaseDate, genres, image }) {

  async function handleAddFavorite() {
  try {
    await addFavorite({
      id,
      title,
      releaseDate,
    });

    alert(`${title} was added to your favorites.`);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

  return (
    <article className="game-card">
      {/* display RAWG artwork when available */}
      {image ? (
        <img
          className="game-image"
          src={image}
          alt={`${title} cover artwork`}
        />
      ) : (
        <div className="game-image-placeholder">
          <span>Game Image</span>
        </div>
      )}

      <div className="game-card-content">
        <h3>{title}</h3>

        <div className="game-meta">
          <span>⭐ {rating}</span>
          <span>{releaseDate}</span>
        </div>

        {/* renders each genre as a separate tag */}
        <div className="game-genres">
          {genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>

        <div className="game-card-actions">
          <button type="button">
            View Details
          </button>

          <button
            type="button"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;