/**
 * A vanilla router based on the blogpost:
 * https://dev.to/kodnificent/how-to-build-a-router-with-vanilla-javascript-2a18
 */
class Router {
    constructor() {
        this.routes = []
    }

    get(uri, callback){
        // ensure that the parameters are not empty
        if(!uri || !callback) throw new Error('uri or callback must be given');

        // ensure that the parameters have the correct types
        if(typeof uri !== "string") throw new TypeError('typeof uri must be a string');
        if(typeof callback !== "function") throw new TypeError('typeof callback must be a function');

        // throw an error if the route uri already exists to avoid confilicting routes
        this.routes.forEach(route=>{
            if(route.uri === uri) throw new Error(`the uri ${route.uri} already exists`);
        })

        // Step 5 - add route to the array of routes
        const route = {
            uri,
            callback
        }
        this.routes.push(route);
    }

    init(){
        this.routes.some(route=>{

            let regEx = new RegExp(`^${route.uri}$`);
            let path = window.location.pathname;

            if ("" !== window.location.hash){
                path = window.location.hash.substring(2)
            }

            if(path.match(regEx)){
                // our route logic is true, return the corresponding callback
                let req = { path }
                return route.callback.call(this, req);
            }
        })
    }

    goto(path){

        this.routes.some(route =>{
            let regEx = new RegExp(`^${route.uri}$`)

            if (path.match(regEx)){

                let req = { path }
                return route.callback.call(this, req);
            }

        })

    }
}
