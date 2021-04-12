const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const db = require("./models/");
const cors = require("cors");
const {MongoClient} = require("mongodb");

app.use(cors());

app.use(bodyParser.json());

async function main() {
  const uri = "mongodb+srv://juancho9300:juancho9300@valhimardb.jaybb.mongodb.net/todo-apps?retryWrites=true&w=majority";
  //  password iría oculta en versión definitiva
  const client = new MongoClient(uri);
  await client.connect();
  await listDatabases(client);

  try {
    await client.connect();

    await listDatabases(client);
 
} catch (e) {
    console.error(e);
}

  finally {
    await client.close();
  }

}

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get('/', (req, res) => { res.send('Hello from Express!');


app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({});
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log(todo);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted!");
  } catch (err) {
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});