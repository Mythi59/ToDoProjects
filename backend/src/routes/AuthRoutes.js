import express from "express";
import authController from "../controllers/AuthController.js";

const route = express.Router();

// public routes
route.post("/register", authController.register);
route.post("/login", authController.login);

export default route;
