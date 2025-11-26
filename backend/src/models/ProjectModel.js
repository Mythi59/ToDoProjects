import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";

class ProjectModel {
  async create(projectData) {
    const db = await DatabaseClient.getDB();
    const collectionProject = db.collection("Project");

    const newProject = {
      name: projectData.name,
      description: projectData.description,
      company: new ObjectId(projectData.companyId),
      createdAt: new Date(),
    };

    return await collectionProject.insertOne(newProject);
  }

  async getAll() {
    const db = await DatabaseClient.getDB();
    const collectionProject = db.collection("Project");
    return await collectionProject.find({}).toArray();
  }

  async getById(id) {
    const db = await DatabaseClient.getDB();
    const collectionProject = db.collection("Project");
    return await collectionProject.findOne({ _id: new ObjectId(id) });
  }

  async getByCompanyId(companyId) {
    const db = await DatabaseClient.getDB();
    const collectionProject = db.collection("Project");
    return await collection
      .find({ company: new ObjectId(companyId) })
      .toArray();
  }

  async update(id, projectData) {
    const db = await DatabaseClient.getDB();
    const collectionProject = db.collection("Project");
    return await collectionProject.updateOne(
      { _id: new ObjectId(id) },
      { $set: projectData }
    );
  }
}

export default new ProjectModel();
