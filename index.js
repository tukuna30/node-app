const express = require("express");
const app = express();
app.set("view engine", "ejs");

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Starting server on port: ${PORT}`);
  console.log("Press Ctrl+C to stop server");
});
