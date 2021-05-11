const { MongoClient } = require("mongodb");
const getUri = (db) => {
  return `mongodb+srv://Smera:smera@cluster0.rynfj.mongodb.net/${db}?retryWrites=true&w=majority`;
};

class MongoUtil {
  constructor(dbName = "users") {
    this.client = new MongoClient(getUri(dbName), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async connect() {
    await this.client.connect();
    console.log("Connected to MongoDB cluster");
  }
}

module.exports = MongoUtil;
