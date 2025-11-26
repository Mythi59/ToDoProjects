import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";

class UserStoryModel {
  async create(userStoryData) {
    const db = await DatabaseClient.getDB();
    const collectionUserStory = db.collection("UserStory");

    const newUserStory = {
      title: userStoryData.title,
      description: userStoryData.description,
      project: new ObjectId(userStoryData.projectId),
      priority: userStoryData.priority || "medium",
      createdBy: userStoryData.userId,
      createdAt: new Date(),
    };

    return await collectionUserStory.insertOne(newUserStory);
  }

  async getAll() {
    const db = await DatabaseClient.getDB();
    const collectionUserStory = db.collection("UserStory");
    return await collectionUserStory.find({}).toArray();
  }

  async getById(id) {
    const db = await DatabaseClient.getDB();
    const collectionUserStory = db.collection("UserStory");
    return await collectionUserStory.findOne({ _id: new ObjectId(id) });
  }

  async getByProjectId(projectId) {
    const db = await DatabaseClient.getDB();
    const collectionUserStory = db.collection("UserStory");
    return await collectionUserStory
      .find({ project: new ObjectId(projectId) })
      .toArray();
  }

  async update(id, userStoryData) {
    const db = await DatabaseClient.getDB();
    const collectionUserStory = db.collection("UserStory");
    return await collectionUserStory.updateOne(
      { _id: new ObjectId(id) },
      { $set: userStoryData }
    );
  }
}

export default new UserStoryModel();
