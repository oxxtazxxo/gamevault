import "../styles/FeaturedGames.css";
import GameCard from "./GameCard";

// Display these games before the user performs a search.
const placeholderGames = [
  {
    id: 1,
    title: "Elden Ring",
    rating: 4.8,
    releaseDate: "Feb 25, 2022",
    genres: ["Action RPG", "Fantasy"],
  },
  {
    id: 2,
    title: "God of War",
    rating: 4.7,
    releaseDate: "Apr 20, 2018",
    genres: ["Action", "Adventure"],
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    rating: 4.6,
    releaseDate: "Oct 26, 2018",
    genres: ["Adventure", "Open World"],
  },
  {
    id: 4,
    title: "The Witcher 3",
    rating: 4.6,
    releaseDate: "May 18, 2015",
    genres: ["RPG", "Open World"],
  },
];

function FeaturedGames({ games = [] }) {
  // Use live RAWG results after a search, or placeholders on initial load.
  const displayedGames =
    games.length > 0
      ? games.map((game) => ({
          id: game.id,
          title: game.name,
          rating: game.rating,
          releaseDate: game.released || "Release date unavailable",
          genres: game.genres?.map((genre) => genre.name) || [],
          image: game.background_image,
        }))
      : placeholderGames;

  return (
    <section className="featured-games">
      <header className="featured-header">
        <h2>{games.length > 0 ? "Search Results" : "Featured Games"}</h2>

        <button type="button" className="view-all">
          View All
        </button>
      </header>

      <div className="game-grid">
        {displayedGames.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            rating={game.rating}
            releaseDate={game.releaseDate}
            genres={game.genres}
            image={game.image}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedGames;