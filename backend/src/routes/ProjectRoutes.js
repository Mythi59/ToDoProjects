import express from "express";
import projectController from "../controllers/ProjectController.js";

const route = express.Router();

route.get("/", projectController.getAllProjects);
route.get("/company/:companyId", projectController.getProjectsByCompany);
route.get("/:id", projectController.getProjectById);
route.post("/", projectController.createProject);
route.put("/:id", projectController.updateProject);

export default route;
