import CompanyModel from "../models/CompanyModel.js";

class Company {
  constructor() {}

  async getAllCompanies(request, response) {
    try {
      const dataAll = await CompanyModel.getAll();
      response
        .status(200)
        .json({ message: "Lista de compañías", body: dataAll });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error al obtener las compañías", body: error });
    }
  }

  async getCompanyById(request, response) {
    try {
      const { id } = request.params;
      const dataById = await CompanyModel.getById(id);
      response
        .status(200)
        .json({ message: "Detalles de la compañía", body: dataById });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error al obtener la compañía", body: error });
    }
  }

  async createCompany(request, response) {
    try {
      const dataCreate = await CompanyModel.create(request.body);
      response
        .status(201)
        .json({ message: "Compañía creada", body: dataCreate });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error al crear la compañía", body: error });
    }
  }

  async updateCompany(request, response) {
    try {
      const { id } = request.params;
      const dataUpdate = await CompanyModel.update(id, request.body);
      response
        .status(200)
        .json({ message: "Compañía actualizada", body: dataUpdate });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error al actualizar la compañía", body: error });
    }
  }
}

export default new Company();
