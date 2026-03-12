const express = require("express");
const cors = require("cors");
const couchbase = require("couchbase");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const connectionString = process.env.COUCHBASE_CONNECTION_STRING;
const username = process.env.COUCHBASE_USERNAME;
const password = process.env.COUCHBASE_PASSWORD;
const bucketName = process.env.COUCHBASE_BUCKET;

let collection;

async function connectDB() {
  try {
    const cluster = await couchbase.connect(connectionString, {
      username,
      password,
    });

    const bucket = cluster.bucket(bucketName);
    collection = bucket.defaultCollection();

    console.log("Connected to Couchbase");
  } catch (err) {
    console.log("Database connection failed:", err);
  }
}

connectDB();

app.post("/punchin", async (req, res) => {
  const time = req.body.time;
  const id = Date.now().toString();

  await collection.upsert(id, { time });

  res.send({ message: "Punch saved" });
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});