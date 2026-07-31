import express from 'express';
export const rawgRouter = express.Router();
var nextPageQuery = null;
var prevPageQuery = null;
const filterTypes = ['parent_platforms', 'platforms', 'stores', 'developers', 'publishers', 'genres', 'tags', 'creators', 'dates', 'updated', 'platforms_count', 'metacritic'];

// GET /api/rawg/search/{search input string}?{query parameters}
// Incoming req.query parameters should include page_size, sort_type, sort_order, and any filters.
// If a filter type has multiple values, they should be sent in csv format I.E. &filter_type=value1,value2,value3
// Fetches the game results from the RAWG api using the paramaters provided in the url and body object.
rawgRouter.get('/search/:search', async (req, res) => {
    nextPageQuery = null;
    prevPageQuery = null;
    try{
        // string that holds the parameters sent to the RAWG api
        var queryString = `?key=${process.env.API_KEY}&search=${req.params.search}&page_size=${req.query.page_size || 10}`;
        if(req.query.sort_type){
            var ordering = req.query.sort_type;
            // RAWG handles sort order by adding a '-' to the front of the sort type if it is descending
            if(req.query.sort_order && req.query.sort_order == 'desc') ordering = '-' + ordering;
            queryString += `&ordering=${ordering}`;
        }
        // iterates through all the different filters and adds them to the query string
        filterTypes.forEach((filter) => {
            if(filter in req.query){
                queryString += `&${filter}=${req.query[filter]}`;
            }
        });
        // performs the fetch to the RAWG api
        const results = await fetch(`https://api.rawg.io/api/games${queryString}`);
        const data = await results.json();
        // saves the query string for the next page of results
        nextPageQuery = data.next;
        res.status(200).json({status: 200, data: { count: data.count, results: data.results}});
    }catch(err){
        console.log(err);
        res.status(400).json({status: 400, message: 'bad request'})
    }
});

// GET /api/rawg/next
// Returns the next page of results
rawgRouter.get('/next', async (req, res) => {
    if(nextPageQuery != null){
        try{
            const results = await fetch(nextPageQuery);
            const data = await results.json();
            nextPageQuery = data.next;
            prevPageQuery = data.previous;
            res.status(200).json({status: 200, data: { count: data.count, results: data.results}});
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
    if(prevPageQuery != null){
        try{
            const results = await fetch(prevPageQuery);
            const data = await results.json();
            nextPageQuery = data.next;
            prevPageQuery = data.previous;
            res.status(200).json({status: 200, data: { count: data.count, results: data.results}});
        }catch (err){
            res.status(400).json({status: 400, message: err});
        }
    } else {
        res.status(404).json({status: 404, message: 'No previous pages remaining'});
    }
});