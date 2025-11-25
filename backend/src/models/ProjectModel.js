import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";

class ProjectModel {
  async create(projectData) {
    const collection = DatabaseClient.db.collection("Project");

    const newProject = {
      name: projectData.name,
      description: projectData.description,
      company: new ObjectId(projectData.companyId),
      createdAt: new Date(),
    };

    return await collection.insertOne(newProject);
  }

  async getAll() {
    const collection = DatabaseClient.db.collection("Project");
    return await collection.find({}).toArray();
  }

  async getById(id) {
    const collection = DatabaseClient.db.collection("Project");
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async getByCompanyId(companyId) {
    const collection = DatabaseClient.db.collection("Project");
    return await collection
      .find({ company: new ObjectId(companyId) })
      .toArray();
  }

  async update(id, projectData) {
    const collection = DatabaseClient.db.collection("Project");
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: projectData }
    );
  }
}

export default new ProjectModel();
