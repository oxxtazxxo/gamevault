
// This function prints a log to the terminal every time a fetch request is made to the server
export function logger(req, res, next){
    console.log(`\n${new Date().toISOString()} ${req.method} request: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    if(req.body){
        console.log(`Data payload: `);
        console.log(req.body);
    }
    next();
}