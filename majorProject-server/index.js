const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

server.use(cors());
server.use(bodyParser.json());

async function main() {
  const uri =
    "mongodb+srv://dinkar030501:4bibho388NwxF4r5@cluster0.n9knupm.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  }
}
async function listDatabases(client) {
  const databasesList = await client
    .db("test")
    .collection("datas")
    .find({})
    .toArray();
  server.get("/projects", async (req, res) => {
    res.json(databasesList);
  });
  server.get("/projects/:department", async (req, res) => {
    const department = req.params.department;
    const result = databasesList.filter(
      (item) => item.department === department
    );
    res.json(result);
  });

  // get productivity from leadership collection
  const productivity = await client
    .db("test")
    .collection("leadership")
    .find({})
    .toArray();
  server.get("/productivity", async (req, res) => {
    res.json(productivity);
  });

  // write a code to post the data to database test and collection leadership
  server.post("/addProductivity", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await client
      .db("test")
      .collection("leadership")
      .insertOne(data);
    console.log(
      `New listing created with the following id: ${result.insertedId}`
    );
    res.json({ message: "File uploaded and data inserted into MongoDB Atlas" });
  });

  server.post("/addEmployee", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await client.db("test").collection("datas").insertOne(data);
    console.log(
      `New listing created with the following id: ${result.insertedId}`
    );
    res.json({ message: "File uploaded and data inserted into MongoDB Atlas" });
  });
}
main();

server.listen(8080, () => {
  console.log("Server started!");
});
