import demoGames from "../data/demoGames";

// Match the numeric platform values used by FilterBar
// to the platform names stored in the demo data.
const platformNames = {
    "4": "PC",
    "187": "PlayStation 5",
    "18": "PlayStation 4",
    "186": "Xbox Series X/S",
    "1": "Xbox One",
    "7": "Nintendo Switch",
};

// Match RAWG genre slugs from FilterBar
// to the readable genre names in demoGames.
const genreNames = {
    action: "Action",
    adventure: "Adventure",
    indie: "Indie",
    "role-playing-games-rpg": "RPG",
    shooter: "Shooter",
    strategy: "Strategy",
    simulation: "Simulation",
    sports: "Sports",
    racing: "Racing",
    puzzle: "Puzzle",
};

// Search and filter the built-in game data used by Demo Mode.
export function searchDemoGames(
    searchTerm,
    filters = {},
    pageSize = 8
) {
    const trimmedSearch = searchTerm.trim().toLowerCase();

    // Match Live Mode by returning no results for an empty search.
    if (!trimmedSearch) {
        return [];
    }

    let results = demoGames.filter((game) =>
        game.name.toLowerCase().includes(trimmedSearch)
    );

    // Filter by the selected genre.
    if (filters.genres) {
        const selectedGenre = genreNames[filters.genres];

        results = results.filter((game) =>
            game.genres?.some(
                (genre) => genre.name === selectedGenre
            )
        );
    }

    // Filter by the selected platform.
    if (filters.platforms) {
        const selectedPlatform =
            platformNames[filters.platforms];

        results = results.filter((game) =>
            game.platforms?.some(
                (item) =>
                    item.platform.name === selectedPlatform
            )
        );
    }

    // Filter games within the selected release-date range.
    if (filters.dates) {
        const [startDate, endDate] =
            filters.dates.split(",");

        results = results.filter((game) => {
            if (!game.released) {
                return false;
            }

            return (
                game.released >= startDate &&
                game.released <= endDate
            );
        });
    }

    // Sort a copied array so the original demo data is not changed.
    if (filters.ordering === "rating") {
        results = [...results].sort(
            (firstGame, secondGame) =>
                secondGame.rating - firstGame.rating
        );
    }

    if (filters.ordering === "released") {
        results = [...results].sort(
            (firstGame, secondGame) =>
                new Date(secondGame.released) -
                new Date(firstGame.released)
        );
    }

    if (filters.ordering === "name") {
        results = [...results].sort(
            (firstGame, secondGame) =>
                firstGame.name.localeCompare(
                    secondGame.name
                )
        );
    }

    // Match the page-size behavior used by the live search.
    return results.slice(0, pageSize);
}