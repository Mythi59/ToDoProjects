import "dotenv/config";
import bcrypt from "bcrypt";
import DatabaseClient from "../config/DatabaseClient.js";
import { ObjectId } from "mongodb";

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10;
class UserModel {
  async createUser(userData) {
    const db = await DatabaseClient.getDB();
    const collectionUser = db.collection("User");

    const hashedPassword = bcrypt.hashSync(userData.password, SALT_ROUNDS); // salt

    const newUser = {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      company: new ObjectId(userData.companyId),
      role: userData.role || "user",
      createdath: new Date(),
    };

    return await collectionUser.insertOne(newUser);
  }

  async findById(id) {
    const db = await DatabaseClient.getDB();
    const collectionUser = db.collection("User");
    return await collectionUser.findOne({ _id: new ObjectId(id) });
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async findByEmail(email) {
    const db = await DatabaseClient.getDB();
    const collectionUser = db.collection("User");
    return await collectionUser.findOne({ email });
  }

  async getUsersByCompany(companyId) {
    const db = await DatabaseClient.getDB();
    const collectionUser = db.collection("User");
    return await collectionUser
      .find({ company: new ObjectId(companyId) })
      .toArray();
  }
}

export default new UserModel();
