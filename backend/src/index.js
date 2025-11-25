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

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the First Deploy Management API 🍿</h1>`);
  res.send(`
      <h3>/company -> Company routes</h3>
      <ul>
        <li>/company -> Get all Companies</li>
        <li>/company/:id -> Get Company by ID</li>
        <li>/company (POST) -> Create a Company</li>
        <li>/company/:id (PUT) -> Update a Company</li>
      </ul>

      <h3>/auth -> Auth routes</h3>
      <ul>
        <li>/auth/login -> Login</li>
        <li>/auth/register -> Register</li>
      </ul>

      <h3>/projects -> Project routes</h3>
      <ul>
        <li>/projects/company/:projectId -> Get Projects by Company ID</li>
        <li>/projects/:id -> Get Project by ID</li>
        <li>/projects (POST) -> Create a Project</li>
        <li>/projects/:id (PUT) -> Update a Project</li>
      </ul>

      <h3>/tickets -> Ticket routes</h3>
      <ul>
        <li>/tickets/project/:projectId -> Get Tickets by Project ID</li>
        <li>/tickets/:id -> Get Ticket by ID</li>
        <li>/tickets (POST) -> Create a Ticket</li>
        <li>/tickets/:id (PUT) -> Update a Ticket</li>
      </ul>
      
      <h3>/user-stories -> User Stories routes</h3>
      <ul>
        <li>/user-stories/project/:projectId -> Get User Stories by Project ID</li>
        <li>/user-stories/:id -> Get User Story by ID</li>
        <li>/user-stories (POST) -> Create a User Story</li>
        <li>/user-stories/:id (PUT) -> Update a User Story</li>
      </ul>
    `);
});

// server
try {
  app.listen(PORT, () => {
    console.log(`Server running in port: ${PORT}`);
    console.log(`API available in http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error starting the server:, ${error.message}`);
}
