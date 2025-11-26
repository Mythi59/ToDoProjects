import "dotenv/config";
import { MongoClient } from "mongodb";

const USER_DB = process.env.USER_DB;
const HOST_DB = process.env.HOST_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;

class DbClient {
  constructor() {
    const queryString = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/?retryWrites=true&w=majority`;
    this.client = new MongoClient(queryString, {
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    this.db = null;
    this.connecting = null;
  }

  async connect() {
    if (this.db) {
      return this.db;
    }

    if (this.connecting) {
      return this.connecting;
    }

    try {
      this.connecting = this.client.connect();
      await this.connecting;
      this.db = this.client.db("FusepongDB");
      console.log("connected mongodb successfully");
      return this.db;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      this.connecting = null;
      throw error;
    }
  }

  async getDB() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }
}

export default new DbClient();
