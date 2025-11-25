import UserStoryModel from "../models/UserStoryModel.js";
import TicketModel from "../models/TicketModel.js";
import { ERROR_MESSAGES } from "../config/Constants.js";

class UserStoryController {
  async getAllUserStories(request, response) {
    try {
      const userStories = await UserStoryModel.getAll();

      return response.status(200).json({
        message: "Lista de historias de usuario",
        body: userStories,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener las historias de usuario",
        details: error.message,
      });
    }
  }

  async getUserStoryById(request, response) {
    try {
      const { id } = request.params;
      const userStory = await UserStoryModel.getById(id);

      if (!userStory) {
        return response.status(404).json({
          error: ERROR_MESSAGES.USER_STORY_NOT_FOUND,
        });
      }

      const tickets = await TicketModel.getByUserStoryId(id);
      userStory.tickets = tickets;

      return response.status(200).json({
        message: "Historia de usuario encontrada",
        body: userStory,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener la historia de usuario",
        details: error.message,
      });
    }
  }

  async getUserStoriesByProject(request, response) {
    try {
      const { projectId } = request.params;
      const userStories = await UserStoryModel.getByProjectId(projectId);

      return response.status(200).json({
        message: "Lista de historias de usuario del proyecto",
        body: userStories,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener las historias de usuario del proyecto",
        details: error.message,
      });
    }
  }

  async createUserStoryWithTicket(request, response) {
    try {
      const { title, description, projectId, ticket, priority } = request.body;
      const userId = request.body.userId || "temp_user";

      if (!title || !projectId || !ticket) {
        return response.status(400).json({
          error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        });
      }

      const userStoryResult = await UserStoryModel.create({
        title,
        description,
        projectId,
        priority,
        userId,
      });

      const userStoryId = userStoryResult.insertedId;

      const ticketResult = await TicketModel.create({
        title: ticket.title,
        description: ticket.description,
        userStoryId: userStoryId,
        userId,
      });

      return response.status(201).json({
        message: "Historia de usuario y ticket creados exitosamente",
        body: {
          userStory: {
            id: userStoryId,
            title,
            description,
            projectId,
            priority,
          },
          firstTicket: {
            id: ticketResult.insertedId,
            title: ticket.title,
            description: ticket.description,
          },
        },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al crear la historia de usuario y el ticket",
        details: error.message,
      });
    }
  }

  async updateUserStory(request, response) {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const result = await UserStoryModel.update(id, updateData);

      if (result.modifiedCount === 0) {
        return response.status(404).json({
          error: ERROR_MESSAGES.USER_STORY_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Historia de usuario actualizada exitosamente",
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al actualizar la historia de usuario",
        details: error.message,
      });
    }
  }
}

export default new UserStoryController();
