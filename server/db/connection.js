import { MongoClient, ServerApiVersion } from 'mongodb';

// we first need to create a connection to the database
const uri = process.env.atlas_uri || "";

// we need to create a client
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// we need to connect to the client
try {
    // we do so using await because it is an asynchronous operation
    await client.connect();
    // send a ping to the database to check if the connection is successful
    await client.db("admin").command({ ping : 1 });
    console.log(
        "Pinged the database successfully. Connection is established."
    );
} catch (err) {
    console.error("Failed to connect. Error: ${err}.");
}

// gets the "employees" database, creates it if it doesn't exist already
let db = client.db("employees");

// we need to export the client so that we can use it in other files
export default client;