$(document).ready(function (){

    // on index load
    // load all route classes
    const router = new Router();

    // add index
    router.get("/", async function (req){
        const homeContent = await getContent("home")
        console.log("home -> ",  homeContent);
        document.getElementById("main-container").innerHTML = homeContent
    })

    let routes = $('.route');

    routes.each(function (n, elm) {
        var route = this.id;

        router.get(route, async function (req) {
            document.getElementById("main-container").innerHTML = await getContent(req.path);
        });
    });

    routes.on('click', function (){
        router.goto(this.id);
    });

    router.init();
});


async function getContent(path){
    let content;

    await fetch("/ingestible-now/routes/"+path+".html")
        .then(function (res){content = res.text()})


    return content
}
