const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://Smera:smera@cluster0.rynfj.mongodb.net/users?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("users").collection("user");
  // perform actions on the collection object
  console.log(collection);
  // client.close();
});
