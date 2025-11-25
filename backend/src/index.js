import express from "express";
import cors from "cors";
import { PORT } from "./config/Environment.js";

// import routes
import routesCompany from "./routes/CompanyRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import projectRoutes from "./routes/ProjectRoutes.js";
import userStoryRoutes from "./routes/UserStoryRoutes.js";
import ticketRoutes from "./routes/TicketRoutes.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/company", routesCompany);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tickets", ticketRoutes);
app.use("/user-stories", userStoryRoutes);

// server
try {
  app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
    console.log(`API available in http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error starting the server:, ${error.message}`);
}
