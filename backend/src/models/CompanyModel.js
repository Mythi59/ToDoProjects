import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";

class CompanyModel {
  async getAll() {
    const db = await DatabaseClient.getDB();
    const collectionCompany = db.collection("Company");
    return await collectionCompany.find({}).toArray();
  }

  async getById(id) {
    const db = await DatabaseClient.getDB();
    const collectionCompany = db.collection("Company");
    return await collectionCompany.findOne({ _id: new ObjectId(id) });
  }

  async create(companyJson) {
    const db = await DatabaseClient.getDB();
    const collectionCompany = db.collection("Company");
    return await collectionCompany.insertOne(companyJson);
  }

  async update(id, companyJson) {
    const db = await DatabaseClient.getDB();
    const collectionCompany = db.collection("Company");
    return await collectionCompany.updateOne(
      { _id: new ObjectId(id) },
      { $set: companyJson }
    );
  }
}

export default new CompanyModel();
