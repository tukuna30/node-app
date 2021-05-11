const userUtil = require("./utils/UserUtil");
const ObjectId = require("mongodb").ObjectId;

const express = require("express");
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3030",
    optionsSuccessStatus: 200,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.set("view engine", "ejs");
const MongoUtil = require("./utils/MongoUtil");

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

app.get("/userslist", (req, res) => {
  let users = userUtil.getUsers();
  return res.json({ users });
});

app.post("/user", (req, res) => {
  let user = req.body;
  let u = userUtil.addUser(user);
  return res.json({ user: u });
});

app.put("/user/:id", (req, res) => {
  // id = req.params.id
  // Make a call to userUtil and update user
  // userUtil.updateUser(id, req.body);
  return res.json({ message: "TBD" });
});

app.delete("/user/:id", (req, res) => {
  // id = req.params.id
  // Make a call to userUtil and delete user
  // userUtil.deleteUser(id);
  return res.json({ message: "TBD" });
});

app.get("/users", async (req, res) => {
  let mongoUtil = await new MongoUtil().connect();
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
  const mongo = new MongoUtil();
  await mongo.connect();

  const userCollection = mongo.client.db("users").collection("user");
  const result = await userCollection.insertOne(req.body);
  res.json({ status: "success", result });
});

app.post("/createQuestion", async (req, res) => {
  console.log(req.body, "create question");
  const mongo = new MongoUtil("questions");
  await mongo.connect();

  const userCollection = mongo.client.db("questions").collection("question");
  const result = await userCollection.insertOne(req.body);
  res.json({ status: "success", result });
});

app.post("/answerQuestion", async (req, res) => {
  console.log(req.body, "update question answer", "questionid", req.query.id);
  const mongo = new MongoUtil("questions");
  await mongo.connect();

  const questionCollection = mongo.client
    .db("questions")
    .collection("question");
  const result = await questionCollection.updateOne(
    { _id: new ObjectId(req.query.id) },
    { $push: { answers: req.body } }
  );
  res.json({ status: "success", result });
});

app.get("/questions", async (req, res) => {
  const mongo = new MongoUtil("questions");
  await mongo.connect();
  const usersCursor = mongo.client
    .db("questions")
    .collection("question")
    .find({ _id: new ObjectId("609aaeca953824144d1b8bf8") });
  const questions = [];
  while (await usersCursor.hasNext()) {
    const doc = await usersCursor.next();
    questions.push(doc);
    console.log(JSON.stringify(doc, null, 4));
    // process doc here
  }

  res.json({ status: "success", questions });
});

app.post("/createUser", async (req, res) => {
  console.log(req.body, "create user data");
  const mongo = new MongoUtil();
  await mongo.connect();

  const userCollection = mongo.client.db("users").collection("user");
  const result = await userCollection.insertOne(req.body);
  res.json({ status: "success", result });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Starting server on port: ${PORT}`);
  console.log("Press Ctrl+C to stop server");
});
