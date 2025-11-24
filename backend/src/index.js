import express from "express";
import { PORT } from "./config/Environment.js";
import routesCompany from "./routes/CompanyRoutes.js";

const app = express();
app.use(express.json());
app.use("/company", routesCompany);

try {
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
} catch (error) {
  console.error("Error starting the server:", error);
}
