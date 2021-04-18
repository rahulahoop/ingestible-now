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
        var route = $(elm).text()
        router.get(route, async function (req) {
            const someContent = await getContent(req.path)
            console.log("route content -->" + someContent);
            document.getElementById("main-container").innerHTML = someContent;
        });
    });

    routes.on('click', function (){
        router.goto(this.id);
    });

    router.init();
});


async function getContent(path){
    let content;

    await fetch("/routes/"+path+".html")
        .then(function (res){content = res.text()})


    return content
}
