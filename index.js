const fetch = require("node-fetch");

async function scoreUsers() {
    let body = {
        script: {
            lang: "painless",
            inline: "ctx._source.calculated_skill = ctx._source.followers + ctx._source.public_repos"
        }
    }

    let queryPromise = await fetch('http://tindev.gijsweterings.nl/es/users/_update_by_query', 
    {
        method: "POST",
        headers: {
            Authorization: "Basic INSERT_TOKEN_HERE",
            contentType: "application/json"
        },
        body: JSON.stringify(body)
    });
    let query = await queryPromise.json();

    console.log("updated " + query.updated + "/" + query.total + " users in " + query.batches + " batches");
}


scoreUsers();