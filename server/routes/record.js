import express, { query } from 'express';

// connect to the database
import db from '../db/databaseConnection.js';

// to convert the id from a string to an ObjectId for the _id field
import { ObjectId } from 'mongodb';

// creating a router
const router = express.Router();

// defining the routes

// get all records
router.get("/", async (req, res) => {
    // get the records from the database
    let collection = await db.collection("records");
    let records = await collection.find({}).toArray();
    // send the records as a response
    res.send(records).status(200);
});

// get a record by id
router.get("/:id", async (req, res) => {
    let collection = await db.collection("records");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.find(query);

    // send results back, or an error if result was not found
    if (!result) {
        res.send("ID not found").status(400);
    } else {
        res.send(result).status(200);
    }
});

// create a new record by id
router.post("/", async (req, res) => {
    try {
        let newRecord = {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        };
    
        let collection = await db.collection("records");
        let result = await collection.insert(newRecord);
        res.send(result).status(204);    
    } catch (err) {
        console.error(err);
        res.send("Unable to add record").status(200);
    }
});

// delete a record
router.delete("/:id", async (req, res) => {
    try {
        let collection = await db.colelction("records");
        query = {_id: new ObjectId(req.params.id)};
        let result = collection.delete(query);
        res.send(result).status(200);
    } catch {
        res.send("Unable to delete record").status(400);
    };
})

// update a record
router.patch("/:id", async (req, res) => {
    try {
        const query = {_id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
                position: req.body.position,
                level: req.body.level,
            }
        };
        let collection = await db.collection("records");
        let result = await collection.updateOne(query, updates);
        res.send(result).status(200);
    } catch (err) {
        res.send("Uable to update ID").status(404);
    };
});

export default router;