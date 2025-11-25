import express from "express";
import ticketController from "../controllers/TicketController.js";

const route = express.Router();

route.get("/", ticketController.getAllTickets);
route.get("/history", ticketController.getTicketHistory);
route.get("/status/:status", ticketController.getTicketsByStatus);
route.get("/:id", ticketController.getTicketById);
route.post("/", ticketController.createTicket);
route.put("/:id", ticketController.updateTicket);
route.put("/:id", ticketController.updateTicket);
route.post("/:id/comments", ticketController.addComment);

export default route;
