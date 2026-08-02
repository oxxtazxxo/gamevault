import "../styles/FilterBar.css";

import {
    LuGamepad2, // genre icon
    LuMonitor, // platform icon
    LuCalendarDays, // release year icon
    LuArrowUpDown, // adds the up down icons for sorting
    LuRotateCcw, // reset icon
} from "react-icons/lu";

function FilterBar({ filters, onFilterChange, onReset }) {
    // Update the matching filter whenever a dropdown selection changes.
    function handleChange(event) {
        const { name, value } = event.target;

        onFilterChange({
            ...filters,
            [name]: value,
        });
    }

    return (
        <section className="filter-bar" aria-label="Game filters">
            <label>

                <span className="filter-label">
                    <LuGamepad2 />
                    <span>Genre</span>
                </span>

                <select
                    name="genres"
                    value={filters.genres}
                    onChange={handleChange}
                >
                    <option value="">All Genres</option>
                    <option value="action">Action</option>
                    <option value="adventure">Adventure</option>
                    <option value="indie">Indie</option>
                    <option value="role-playing-games-rpg">RPG</option>
                    <option value="shooter">Shooter</option>
                    <option value="strategy">Strategy</option>
                    <option value="simulation">Simulation</option>
                    <option value="sports">Sports</option>
                    <option value="racing">Racing</option>
                    <option value="puzzle">Puzzle</option>
                </select>
            </label>

            <label>
                <span className="filter-label">
                    <LuMonitor />
                    <span>Platform</span>
                </span>

                <select
                    name="platforms"
                    value={filters.platforms}
                    onChange={handleChange}
                >
                    <option value="">All Platforms</option>
                    <option value="4">PC</option>
                    <option value="187">PlayStation 5</option>
                    <option value="18">PlayStation 4</option>
                    <option value="186">Xbox Series X/S</option>
                    <option value="1">Xbox One</option>
                    <option value="7">Nintendo Switch</option>
                </select>
            </label>

            <label>
                <span className="filter-label">
                    <LuCalendarDays />
                    <span>Release Year</span>
                </span>

                <select
                    name="dates"
                    value={filters.dates}
                    onChange={handleChange}
                >
                    <option value="">All Years</option>
                    <option value="2026-01-01,2026-12-31">2026</option>
                    <option value="2025-01-01,2025-12-31">2025</option>
                    <option value="2024-01-01,2024-12-31">2024</option>
                    <option value="2023-01-01,2023-12-31">2023</option>
                    <option value="2022-01-01,2022-12-31">2022</option>
                    <option value="2021-01-01,2021-12-31">2021</option>
                    <option value="2020-01-01,2020-12-31">2020</option>
                </select>
            </label>

            <label>
                <span className="filter-label">
                    <LuArrowUpDown />
                    <span>Sort By</span>
                </span>

                <select
                    name="ordering"
                    value={filters.ordering}
                    onChange={handleChange}
                >
                    <option value="">Relevance</option>
                    <option value="rating">Rating</option>
                    <option value="released">Release Date</option>
                    <option value="name">Name (A–Z)</option>
                </select>
            </label>

            {/* Clear every selected filter and return the dropdowns to default. */}
            <button
                type="button"
                className="reset-button"
                onClick={onReset}
            >
                <LuRotateCcw />
                <span>Reset Filters</span>
            </button>
        </section>
    );
}

export default FilterBar;