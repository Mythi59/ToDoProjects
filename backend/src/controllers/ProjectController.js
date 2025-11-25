import ProjectModel from "../models/ProjectModel.js";
import { ERROR_MESSAGES } from "../config/Constants.js";

class ProjectController {
  async getAllProjects(request, response) {
    try {
      const projects = await ProjectModel.getAll();

      return response.status(200).json({
        message: "Lista de proyectos",
        body: projects,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener los proyectos",
        details: error.message,
      });
    }
  }

  async getProjectById(request, response) {
    try {
      const { id } = request.params;
      const project = await ProjectModel.getById(id);

      if (!project) {
        return response.status(404).json({
          error: ERROR_MESSAGES.PROJECT_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Proyecto encontrado",
        body: project,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error al obtener el proyecto",
        details: error.message,
      });
    }
  }

  async getProjectsByCompany(request, response) {
    try {
      const { companyId } = request.params;
      const projects = await ProjectModel.getByCompanyId(companyId);

      return response.status(200).json({
        message: "Proyectos de la compañía",
        body: projects,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al obtener proyectos de la compañía",
        details: error.message,
      });
    }
  }

  // Crear proyecto
  async createProject(request, response) {
    try {
      const { name, description, companyId } = request.body;

      // Validaciones básicas
      if (!name || !companyId) {
        return response.status(400).json({
          error: "Nombre y companyId son obligatorios",
        });
      }

      const result = await ProjectModel.create({
        name,
        description,
        companyId,
      });

      return response.status(201).json({
        message: "Proyecto creado exitosamente",
        body: {
          id: result.insertedId,
          name,
          description,
          companyId,
        },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al crear proyecto",
        details: error.message,
      });
    }
  }

  // Actualizar proyecto
  async updateProject(request, response) {
    try {
      const { id } = request.params;
      const updateData = request.body;

      const result = await ProjectModel.update(id, updateData);

      if (result.matchedCount === 0) {
        return response.status(404).json({
          error: ERROR_MESSAGES.PROJECT_NOT_FOUND,
        });
      }

      return response.status(200).json({
        message: "Proyecto actualizado exitosamente",
        body: updateData,
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al actualizar proyecto",
        details: error.message,
      });
    }
  }
}

export default new ProjectController();
