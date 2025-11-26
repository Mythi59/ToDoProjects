import { useState, useEffect } from "react";
import "./CompanyList.css";
import Navbar from "../Layouts/Navbar";
import { companiesAPI } from "../../api/Client.js";

const CompanyList = ({ onViewChange }) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await companiesAPI.getAll();
        setCompanies(response.body);
      } catch (error) {
        console.error("Error al obtener las compañias front: ", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyClick = (company) => {
    onViewChange("projects", { company });
  };

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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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
      </div>
    </div>
  );
};

export default CompanyList;
