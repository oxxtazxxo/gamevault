import express from 'express';
export const rawgRouter = express.Router();
// contain the RAWG api fetch url for the next and previous pages of paginated results.
var nextPageQuery = null;
var prevPageQuery = null;

//list of sort types that could be present in the query request from the front end. '-' in front means descending
const sortTypes = ['released', '-released', 'rating', '-rating', 'name', '-name'];

//list of filter parameters that could be present in the query request from the front end.
const filterTypes = {
    genres: ['action','adventure','indie','role-playing-games-rpg','shooter','strategy','simulation','sports','racing','puzzle'],
    platforms: ['4','187','18','186','1','7'],
    dates: ['2026-01-01','2026-12-31','2025-01-01','2025-12-31','2024-01-01','2024-12-31','2023-01-01','2023-12-31','2022-01-01','2022-12-31','2021-01-01','2021-12-31','2020-01-01','2020-12-31']
}

// This function validates the search input, making sure it is within 2-60 characters, and it contains atleast one letter or number
function validateSearchInput(input){
    const minLength = 2;
    const maxLength = 60;

    //tests for valid character length
    if (input.length < minLength || input.length > maxLength) throw new Error(`Invalid input: Search text must be ${minLength}-${maxLength} characters.`);
    //checks if search input contains atleast one letter or number
    if(!(/[a-zA-Z0-9]/.test(input))) throw new Error(`Invalid input: Search text must contain atleast one letter or number`);
}

// This function validates the page size sent from the frontend
function validatePageSize(pageSize){
    if(pageSize < 4 || pageSize > 32) throw new Error(`Invalid page size. Must be >= 4 or <= 32`);
}

// This function validates the sort type sent from the frontend
function validateOrdering(ordering){
    if(!sortTypes.includes(ordering)) throw new Error(`Invalid input: '${ordering}' is not a valid sort type`);
}

// This function makes sure that the genre filter list sent from the frontend only contains the genres listed in filterTypes
function validateGenres(genreList){
    const genres = genreList.split(',');
    genres.forEach((genre) => {
        if(!filterTypes.genres.includes(genre)){
            throw new Error(`Invalid genre filter input: '${genre}' is not a valid genre`);
        }
    })
}

// This function makes sure that the platform filter list sent from the frontend only contains the platform ids listed in filterTypes
function validatePlatforms(platformList){
    const platforms = platformList.split(',');
    platforms.forEach((platform) => {
        if (!filterTypes.platforms.includes(platform)){
            throw new Error(`Invalid platform filter input: '${platform}' is not a valid platform id`);
        }
    })
}

// This function makes sure that the dates filter list sent from the frontend only contains the dates listed in filterTypes
function validateDates(dateList){
    const dates = dateList.split(',');
    dates.forEach((date) => {
        if(!filterTypes.dates.includes(date)){
            throw new Error(`Invalid date filter input: '${date}' is not a valid date`);
        }
    })
}

// GET /api/rawg/search/{search input string}?{query parameters}
// Incoming req.query parameters must include page_size, optional parameters: ordering, genres, platforms, dates
// If a filter type has multiple values, they should be sent in csv format I.E. &filter_type=value1,value2,value3
// Fetches the game results from the RAWG api using the paramaters provided in the url and body object.
rawgRouter.get('/search/:search', async (req, res) => {
    console.log('in api/rawg/search/:search');
    nextPageQuery = null;
    prevPageQuery = null;
    try{
        // string that holds the parameters sent to the RAWG api. Trims to remove leading and trailing whitespace
        const searchInput = req.params.search.trim();
        validateSearchInput(searchInput);
        validatePageSize(req.query.page_size);
        var queryString = `?key=${process.env.API_KEY}&search=${searchInput}&page_size=${req.query.page_size || 10}`;
        // checks for all optional search parameters
        if('ordering' in req.query && req.query.ordering != ''){
            validateOrdering(req.query.ordering);
            queryString += `&ordering=${req.query.ordering}`;
        }
        if('genres' in req.query && req.query.genres != ''){
            validateGenres(req.query.genres);
            queryString += `&genres=${req.query.genres}`;
        }
        if('platforms' in req.query && req.query.platforms != ''){
            validatePlatforms(req.query.platforms);
            queryString += `&platforms=${req.query.platforms}`;
        }
        if('dates' in req.query && req.query.dates != ''){
            validateDates(req.query.dates);
            queryString += `&dates=${req.query.dates}`;
        }
        // performs the fetch to the RAWG api
        const results = await fetch(`https://api.rawg.io/api/games${queryString}`);
        const data = await results.json();
        // saves the query string for the next page of results
        nextPageQuery = data.next;
        // data payload to be sent back to frontend. count = amount of total results, next = flag for a next page, prev = flag for a previous page
        var resultPayload = {status: 200, data: { count: data.count, next: nextPageQuery != null, prev: false, results: data.results}};
        res.status(200).json(resultPayload);
    }catch(err){
        console.log(err);
        res.status(400).json({status: 400, message: err.message})
    }
});

// GET /api/rawg/next
// Returns the next page of results
rawgRouter.get('/next', async (req, res) => {
    console.log('in /api/rawg/next')
    if(nextPageQuery != null){
        try{
            const results = await fetch(nextPageQuery);
            const data = await results.json();
            // saves the query string for the next and previous page of results
            nextPageQuery = data.next;
            prevPageQuery = data.previous;
            // data payload to be sent back to frontend. count = amount of total results, next = flag for a next page, prev = flag for a previous page
            var resultPayload = {status: 200, data: { count: data.count, next: nextPageQuery != null, prev: true, results: data.results}}
            res.status(200).json(resultPayload);
        }catch (err){
            res.status(400).json({status: 400, message: err});
        }
    } else {
        res.status(404).json({status: 404, message: 'No next pages remaining'});
    }
});

// GET /api/rawg/prev
// Returns the previous page of results
rawgRouter.get('/prev', async (req, res) => {
    console.log('in /api/rawg/prev')
    if(prevPageQuery != null){
        try{
            const results = await fetch(prevPageQuery);
            const data = await results.json();
            nextPageQuery = data.next;
            prevPageQuery = data.previous;
            // data payload to be sent back to frontend. count = amount of total results, next = flag for a next page, prev = flag for a previous page
            var resultPayload = {status: 200, data: { count: data.count, next: true, prev: prevPageQuery != null, results: data.results}}
            res.status(200).json(resultPayload);
        }catch (err){
            res.status(400).json({status: 400, message: err});
        }
    } else {
        res.status(404).json({status: 404, message: 'No previous pages remaining'});
    }
});