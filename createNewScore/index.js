const CosmosClient = require("@azure/cosmos").CosmosClient;

const endpoint = "https://annu.documents.azure.com:443/";
const key = "7LbKGSqmiYxbPSbIh1oQCSwnlDjoYBxpVHWKx9pl0SJbd35a2MrBRQVDdoBpCspXNLRSue8i0UX2WNQxG1LrMw==";

const client = new CosmosClient({ endpoint, key });

const databaseId = "ScoreDB";
const containerId = "Scores";

const database = client.database(databaseId);
const container = database.container(containerId);


module.exports = async function (context, req) {

    let scoreItem = {
        "name": req.query.name,
        "score": 0
    };

    const { resource: createdItem } = await container.items.create(scoreItem);
    const responseMessage = "Yay! You sucessfully inserted this item into the database!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}