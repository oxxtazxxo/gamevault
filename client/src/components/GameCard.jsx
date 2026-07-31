import "../styles/GameCard.css";

// Reusable card for displaying a single game's summary information.
function GameCard({ title, rating, releaseDate, genres, image }) {
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

        <button type="button">View Details</button>
      </div>
    </article>
  );
}

export default GameCard;