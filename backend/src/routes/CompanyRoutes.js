import express from "express";
import CompanyControllers from "../controllers/CompanyControllers.js";

const route = express.Router();

route.get("/", CompanyControllers.getAllCompanies);
route.get("/:id", CompanyControllers.getCompanyById);
route.post("/", CompanyControllers.createCompany);
route.put("/:id", CompanyControllers.updateCompany);

export default route;
