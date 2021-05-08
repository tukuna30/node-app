const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://Smera:smera@cluster0.rynfj.mongodb.net/users?retryWrites=true&w=majority";

class MongoUtil {
  constructor() {
    this.client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to MongoDB cluster");
  }
}

module.exports = new MongoUtil();
