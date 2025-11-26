import { useState, useEffect } from "react";
import "./CompanyList.css";
import Navbar from "../Layouts/Navbar";
import { companiesAPI, projectsAPI } from "../../api/Client.js";

const CompanyList = ({ onViewChange }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await companiesAPI.getAll();
        const companiesWithProjects = await Promise.all(
          response.body.map(async (company) => {
            try {
              const projectsResponse = await projectsAPI.getByProject(
                company._id
              );
              return {
                ...company,
                id: company._id,
                projectsCount: projectsResponse.body?.length || 0,
              };
            } catch (error) {
              return {
                ...company,
                id: company._id,
                projectsCount: 0,
                error,
              };
            }
          })
        );

        setCompanies(companiesWithProjects);
      } catch (error) {
        console.error("Error al obtener las compañías:", error);
        alert("Error al cargar las compañías");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (company) => {
    onViewChange("projects", { company });
  };

  if (loading) {
    return (
      <div className="company-view">
        <Navbar onViewChange={onViewChange} />
        <div className="container">
          <div className="company-header">
            <h2 className="company-title">Cargando compañías...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="company-view">
      <Navbar onViewChange={onViewChange} />

      <div className="container">
        <div className="company-header">
          <h2 className="company-title">Selecciona una Compañía</h2>
          <p className="company-subtitle">
            Elige la compañía para ver sus proyectos
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="card">
            <p>No hay compañías disponibles</p>
          </div>
        ) : (
          <div className="company-grid">
            {companies.map((company) => (
              <div
                key={company.id}
                className="company-card"
                onClick={() => handleCompanyClick(company)}
              >
                <div className="company-card-header">
                  <div className="company-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <span className="badge badge-blue">
                    {company.projectsCount} proyecto
                    {company.projectsCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <h3 className="company-name">{company.name}</h3>
                <p className="company-action">Ver proyectos →</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
