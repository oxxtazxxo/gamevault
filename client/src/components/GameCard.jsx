import "../styles/GameCard.css";

// Reusable card for displaying a single game's summary information.
function GameCard({ title, rating, releaseDate, genres }) {
  return (
    <article className="game-card">
      {/* Placeholder until RAWG image data is connected. */}
      <div className="game-image-placeholder">
        <span>Game Image</span>
      </div>

      <div className="game-card-content">
        <h3>{title}</h3>

        <div className="game-meta">
          <span>⭐ {rating}</span>
          <span>{releaseDate}</span>
        </div>

        {/* Render each genre as a separate tag. */}
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