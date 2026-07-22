import express from 'express';
export const rawgRouter = express.Router();
var nextPageQuery = null;
var prevPageQuery = null;

/*
    Body json format:
    {
        page_size: int, // amount of games per page
        sort_type: String, // name, released, added, created, updated, rating, metacritic
        sort_order: String, // asc or desc
        filters: { // for filters, only add the filters that are active, if there are no filters leave it empty
            parent_platforms: [], // by id
            platforms: [], // by id
            stores: [], // by id
            developers: [], // by id or string
            publishers: [], // by id or string
            genres: [], // by id or string
            tags: [], // by id or string
            creators: [], // by id or string
            dates: [], // string, yyyy-mm-dd
            updated: [], // string, yyyy-mm-dd
            platforms_count: [], // int
            metacritic: [] // int
        }
    }
*/
// GET /api/rawg/search/{search input string}
// Fetches the game results from the RAWG api using the paramaters provided in the url and body object.
rawgRouter.get('/search/:search', async (req, res) => {
    nextPageQuery = null;
    prevPageQuery = null;
    try{
        // string that holds the parameters sent to the RAWG api
        var queryParams = `&page_size=${req.body.page_size}`;
        // RAWG determines ascending or descending by putting a '-' in front of the sort type if it is descending
        var ordering = req.body.sort_type;
        if(req.body.sort_order == 'desc') ordering = '-' + ordering;
        queryParams += `ordering=${ordering}`;
        // iterates through all the different filters and adds them to the query string
        if(req.body.filters) {
            for(const key of Object.keys(req.body.filters)){
                queryParams += `&${key}=`;
                if(Array.isArray(req.body.filters[key])){
                    req.body.filters[key].forEach((value, index) => {
                        if(index != 0){
                            queryParams += `,`;
                        }
                        queryParams += `${value}`;
                    })
                }
            }
        }
        // performs the fetch to the RAWG api
        const results = await fetch(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${req.params.search}${queryParams}`);
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