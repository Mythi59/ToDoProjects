import { MongoClient } from "mongodb";
import { HOST_DB, PASSWORD_DB, USER_DB } from "./Environment.js";

class DbClient {
  constructor() {
    const queryString = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/?retryWrites=true&w=majority`;
    this.client = new MongoClient(queryString);
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db("FusepongDB");
      console.log("connected mongodb successfully");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
}

export default new DbClient();
