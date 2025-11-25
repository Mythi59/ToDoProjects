import TicketModel from "../models/TicketModel.js";
import UserStoryModel from "../models/UserStoryModel.js";
import { ERROR_MESSAGES, TICKET_STATUS } from "../config/Constants.js";

class TickerController {
  constructor() {}

  async getAllTickets(request, response) {
    try {
      const tickets = await TicketModel.getAll();

      return response.status(200).json({
        message: "Lista de tickets",
        body: tickets,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener la lista de tickets",
        details: error.message,
      });
    }
  }

  async getTicketById(request, response) {
    try {
      const { id } = request.params;
      const ticket = await TicketModel.getById(id);

      if (!ticket) {
        return response.status(404).json({
          error: ERROR_MESSAGES.TICKET_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Ticket encontrado",
        body: ticket,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener el ticket por ID",
        details: error.message,
      });
    }
  }

  async getAllTicketsByUserStory(request, response) {
    try {
      const { userStoryId } = request.params;
      const tickets = await UserStoryModel.getByUserStoryId(userStoryId);

      return response.status(200).json({
        message: "Lista de tickets por User Story",
        body: tickets,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener tickets por historia de usuario",
        details: error.message,
      });
    }
  }

  async getTicketsByStatus(request, response) {
    try {
      const { status } = request.params;

      const validStatuses = Object.values(TICKET_STATUS);
      if (!validStatuses.includes(status)) {
        return response.status(400).json({
          error: ERROR_MESSAGES.INVALID_TICKET_STATUS,
        });
      }

      const tickets = await TicketModel.getByStatus(status);

      return response.status(200).json({
        message: `Lista de tickets con estado: ${status}`,
        body: tickets,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener tickets por estado",
        details: error.message,
      });
    }
  }

  async getTicketHistory(request, response) {
    try {
      const userId = request.body.userId || "temp_user";
      const tickets = await TicketModel.getTicketHistory(userId);

      return response.status(200).json({
        message: "Historial de tickets del usuario",
        body: tickets,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener el historial de tickets del usuario",
        details: error.message,
      });
    }
  }

  async createTicket(request, response) {
    try {
      const { title, description, userStoryId, comments } = request.body;
      const userId = request.body.userId || "temp_user";

      if (!title || !userStoryId) {
        return response.status(400).json({
          error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        });
      }

      const result = await TicketModel.create({
        title,
        description,
        userStoryId,
        userId,
        comments,
      });

      return response.status(201).json({
        message: "Ticket creado exitosamente",
        body: {
          id: result.insertedId,
          title,
          description,
          userStoryId,
          status: TICKET_STATUS.ACTIVE,
        },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al crear el ticket",
        details: error.message,
      });
    }
  }

  async updateTicket(request, response) {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const result = await TicketModel.update(id, updateData);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          error: ERROR_MESSAGES.TICKET_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Ticket actualizado exitosamente",
        body: { updateData },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al actualizar el ticket",
        details: error.message,
      });
    }
  }

  async addComment(request, response) {
    try {
      const { id } = request.params;
      const { comments } = request.body;
      let { user } = request.body || "temp_user";

      if (!comments) {
        return response.status(400).json({
          error: ERROR_MESSAGES.MISSING_REQUIRED_FIELDS,
        });
      }

      const result = await TicketModel.addComments(id, { user, comments });

      if (result.affectedRows === 0) {
        return response.status(404).json({
          error: ERROR_MESSAGES.TICKET_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Comentario agregado exitosamente",
        body: { user, comments },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al agregar el comentario",
        details: error.message,
      });
    }
  }
}

export default new TickerController();
