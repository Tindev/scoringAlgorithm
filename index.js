const fetch = require("node-fetch");
const authentication = require("./token.json");

async function scoreUsers() {
    let body = {
        script: {
            lang: "painless",
            inline: "ctx._source.calculated_skill = 0.05 * ctx._source.followers + 0.05 * ctx._source.public_repos"
        }
    }

    try {
        let queryPromise = await fetch('http://tindev.gijsweterings.nl/es/users/_update_by_query', 
        {
            method: "POST",
            headers: {
                Authorization: authentication.token,
                contentType: "application/json"
            },
            body: JSON.stringify(body)
        });
        let query = await queryPromise.json();

        console.log("updated " + query.updated + "/" + query.total + " users in " + query.batches + " batches");
    }
    catch(e) {
        console.error(e);
    }
}


scoreUsers();