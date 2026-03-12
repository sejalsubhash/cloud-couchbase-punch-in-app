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

let collection;

async function connectDB() {
  const cluster = await couchbase.connect(connectionString, {
    username,
    password,
  });

  const bucket = cluster.bucket(bucketName);
  collection = bucket.defaultCollection();
}

connectDB();

app.post("/punchin", async (req, res) => {
  const time = req.body.time;
  const id = Date.now().toString();

  await collection.upsert(id, { time });

  res.send({ message: "Punch saved" });
});

app.get("/punchins", async (req, res) => {
  const result = await collection.getAll();
  res.send(result);
});

app.listen(10000, () => {
  console.log("Server running");
});