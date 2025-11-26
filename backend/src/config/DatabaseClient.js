import "dotenv/config";
import { MongoClient } from "mongodb";

const USER_DB = process.env.USER_DB;
const HOST_DB = process.env.HOST_DB;
const PASSWORD_DB = process.env.PASSWORD_DB;

class DbClient {
  constructor() {
    const queryString = `mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/?retryWrites=true&w=majority`;
    this.client = new MongoClient(queryString, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      tls: true,
      tlsAllowInvalidCertificates: false,
      maxPoolSize: 10,
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
      console.log("Attempting to connect to MongoDB...");
      this.connecting = this.client.connect();
      await this.connecting;
      this.db = this.client.db("FusepongDB");

      // Ping para verificar conexión
      await this.db.command({ ping: 1 });
      console.log("Connected to MongoDB successfully");

      return this.db;
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
      this.connecting = null;
      this.db = null;
      throw error;
    }
  }

  async getDB() {
    if (!this.db) {
      await this.connect();
    }
    return this.db;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.db = null;
      this.connecting = null;
      console.log("MongoDB connection closed");
    }
  }
}

export default new DbClient();
