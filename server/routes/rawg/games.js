import express from 'express';
export const gamesRouter = express.Router();

/*
    Body json format:
    {
        sort_type: String, // name, released, added, created, updated, rating, metacritic
        sort_order: String, // asc or desc
        filters: {
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
gamesRouter.get('/search/:search', (req, res) => {
    
});

gamesRouter.get('/next', (req, res) => {

});

gamesRouter.get('/prev', (req, res) => {

})

