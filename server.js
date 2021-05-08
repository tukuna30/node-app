const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set("view engine", "ejs");
const mongoUtil = require("./utils/MongoUtil");

var tasks = [
  { id: 1, label: "Complete math homework" },
  { id: 2, label: "Build web app" },
];

app.get("/help", (req, res) => {
  res.render("help");
});

app.get("/", (req, res) => {
  res.render("index", { tasks: tasks });
});

app.get("/contact", (req, res) => {
  res.render("contacts");
});

app.get("/users", async (req, res) => {
  await mongoUtil.connect();
  const usersCursor = mongoUtil.client.db("users").collection("user").find();
  // function iterateFunc(doc) {
  //   users.push(doc);
  //   console.log(JSON.stringify(doc, null, 4));
  // }

  // function errorFunc(error) {
  //   console.log(error);
  // }

  // await usersCursor.forEach(iterateFunc, errorFunc);
  const users = [];
  while (await usersCursor.hasNext()) {
    const doc = await usersCursor.next();
    users.push(doc);
    console.log(JSON.stringify(doc, null, 4));
    // process doc here
  }

  res.render("users", { users: users });
});

app.post("/createUser", async (req, res) => {
  console.log(req.body, "create user data");
  await mongoUtil.connect();

  const userCollection = mongoUtil.client.db("users").collection("user");
  const result = await userCollection.insertOne(req.body);
  res.json({ status: "success", result });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Starting server on port: ${PORT}`);
  console.log("Press Ctrl+C to stop server");
});
