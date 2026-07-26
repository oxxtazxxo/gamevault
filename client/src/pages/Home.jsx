import Hero from '../components/Hero'
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import FeaturedGames from "../components/FeaturedGames";

function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FilterBar />
      <FeaturedGames />
    </main>
  );
}

export default Home