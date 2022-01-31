const CosmosClient = require("@azure/cosmos").CosmosClient;

const endpoint = "https://annu.documents.azure.com:443/";
const key = "7LbKGSqmiYxbPSbIh1oQCSwnlDjoYBxpVHWKx9pl0SJbd35a2MrBRQVDdoBpCspXNLRSue8i0UX2WNQxG1LrMw==";


const databaseId = "ScoreDB";
const containerId = "Scores";

const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);


module.exports = async function (context, req) {


    //Increment a specific score inside the CosmosDB collection, based on id of the entry.

    let querySpec = {
        query: "SELECT * FROM Scores s WHERE s.name =" + "'" + req.query.name + "'"
    }

    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    let scoreObj = items[this.querySpec];
    let scoreId = scoreObj.id;
    let scoreValue = scoreObj.score;


    scoreObj.score = scoreValue + 1;

    const { resource: updatedItem } = await container
        .item(scoreId)
        .replace(scoreObj)

    const responseMessage = "You have successfully increased the score by 1!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}