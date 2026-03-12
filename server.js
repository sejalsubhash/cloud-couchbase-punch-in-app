const express = require("express");
const cors = require("cors");
const couchbase = require("couchbase");

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = process.env.COUCHBASE_CONNECTION_STRING;
const username = process.env.COUCHBASE_USERNAME;
const password = process.env.COUCHBASE_PASSWORD;
const bucketName = process.env.COUCHBASE_BUCKET;

let cluster;
let collection;

async function connectDB() {
  try {
    cluster = await couchbase.connect(connectionString, {
      username,
      password,
    });

    const bucket = cluster.bucket(bucketName);
    collection = bucket.defaultCollection();

    console.log("Connected to Couchbase");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

connectDB();

app.post("/punchin", async (req, res) => {
  try {
    const time = req.body.time;
    const id = Date.now().toString();

    await collection.upsert(id, { time });

    res.send({ message: "Punch saved" });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/punchins", async (req, res) => {
  try {
    const query = `SELECT time FROM \`${bucketName}\``;
    const result = await cluster.query(query);

    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});