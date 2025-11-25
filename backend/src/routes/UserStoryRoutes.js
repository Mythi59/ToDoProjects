import express from "express";
import userStoryController from "../controllers/UserStoryController.js";

const route = express.Router();

route.get("/", userStoryController.getAllUserStories);
route.get("/project/:projectId", userStoryController.getUserStoriesByProject);
route.get("/:id", userStoryController.getUserStoryById);
route.post("/", userStoryController.createUserStoryWithTicket);
route.put("/:id", userStoryController.updateUserStory);

export default route;
