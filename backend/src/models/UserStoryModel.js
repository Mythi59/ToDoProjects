import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";

class UserStoryModel {
  async create(userStoryData) {
    const collection = DatabaseClient.db.collection("UserStory");

    const newUserStory = {
      title: userStoryData.title,
      description: userStoryData.description,
      project: new ObjectId(userStoryData.projectId),
      priority: userStoryData.priority || "medium",
      createdBy: userStoryData.userId,
      createdAt: new Date(),
    };

    return await collection.insertOne(newUserStory);
  }

  async getAll() {
    const collection = DatabaseClient.db.collection("UserStory");
    return await collection.find({}).toArray();
  }

  async getById(id) {
    const collection = DatabaseClient.db.collection("UserStory");
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  async getByProjectId(projectId) {
    const collection = DatabaseClient.db.collection("UserStory");
    return await collection
      .find({ project: new ObjectId(projectId) })
      .toArray();
  }

  async update(id, userStoryData) {
    const collection = DatabaseClient.db.collection("UserStory");
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: userStoryData }
    );
  }
}

export default new UserStoryModel();
