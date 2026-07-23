import Hero from '../components/Hero'
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

function Home() {
  return (
    <main>
      <Hero />
      <SearchBar />
      <FilterBar />
    </main>
  );
}

export default Home