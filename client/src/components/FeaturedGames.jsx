import "../styles/FeaturedGames.css";
import GameCard from "./GameCard";

// Temporary placeholder data until the RAWG API is connected.
const featuredGames = [
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


function FeaturedGames() {
  return (
    <section className="featured-games">
      <div className="featured-header">
        <h2>Featured Games</h2>

        <button type="button" className="view-all">
          View All
        </button>
      </div>

      <div className="game-grid">
        {featuredGames.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            rating={game.rating}
            releaseDate={game.releaseDate}
            genres={game.genres}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedGames;