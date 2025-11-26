import { ObjectId } from "mongodb";
import DatabaseClient from "../config/DatabaseClient.js";
import { TICKET_STATUS } from "../config/Constants.js";

class TicketModel {
  async create(ticketData) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");

    const newTicket = {
      title: ticketData.title,
      description: ticketData.description,
      userStory: ticketData.userStoryId,
      status: TICKET_STATUS.ACTIVE,
      comments: ticketData.comments || [],
      createdBy: ticketData.userId,
      createdAt: new Date(),
      updateAt: new Date(),
    };

    return await collectionTicket.insertOne(newTicket);
  }

  async getAll() {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.find({}).toArray();
  }

  async getById(id) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.findOne({ _id: new ObjectId(id) });
  }

  async getByStatus(status) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.find({ status }).toArray();
  }

  async update(id, ticketData) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: { ...ticketData, updateAt: new Date() } }
    );
  }

  async addComments(id, observationData) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.updateOne(
      { _id: new ObjectId(id) },
      {
        $push: {
          comments: {
            userId: observationData.userId,
            text: observationData.comments.text,
            createdAt: new Date(),
          },
        },
        $set: { updateAt: new Date() },
      }
    );
  }

  async updateStatus(id, status) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updateAt: new Date() } }
    );
  }

  async getTicketHistory(userId) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket
      .find({ createdBy: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  async getByUserStoryId(userStoryId) {
    const db = await DatabaseClient.getDB();
    const collectionTicket = db.collection("Ticket");
    return await collectionTicket
      .find({ userStory: new ObjectId(userStoryId) })
      .toArray();
  }
}

export default new TicketModel();
