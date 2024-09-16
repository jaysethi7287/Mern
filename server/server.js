import express from 'express';
import cors from 'cors';
import records from "./routes/record.js";

// Define what port to use
const PORT = process.env.PORT || 5050;
// Create an express app
const app = express();

// Use cors
app.use(cors());
// Use express.json
app.use(express.json());
// Use the record routes
// what this means is that if you go to /record, it will use the record routes
app.use("/record", records);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
