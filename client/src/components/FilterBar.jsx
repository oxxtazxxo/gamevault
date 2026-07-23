import "../styles/FilterBar.css";

function FilterBar() {
    return (
        <section className="filter-bar" aria-label="Game filters">
            <label>
                <span>Genre</span>
                <select defaultValue="">
                    <option>All Genres</option>
                </select>
            </label>

            <label>
                <span>Platform</span>
                <select defaultValue="">
                    <option>All Platforms</option>
                </select>
            </label>

            <label>
                <span>Release Year</span>
                <select defaultValue="">
                    <option>All Years</option>
                </select>
            </label>

            <button type="button">Reset Filters</button>
        </section>
    );
}

export default FilterBar;