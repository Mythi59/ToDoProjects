import { useState, useEffect } from "react";
import "./ProjectList.css";
import Navbar from "../Layouts/Navbar";
import { projectsAPI } from "../../api/Client";

const ProjectList = ({ company, onViewChange }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectsAPI.getAll();
        setProjects(response.body);
      } catch (error) {
        console.error("Error al obtener los proyectos front: ", error);
      }
    };

    fetchProjects();
  }, [company]);

  const handleProjectClick = (project) => {
    onViewChange("board", { project });
  };

  return (
    <div className="project-view">
      <Navbar
        onViewChange={onViewChange}
        title={company?.name}
        showBack={true}
        onBack={() => onViewChange("companies")}
      />

      <div className="container">
        <div className="project-header">
          <h2 className="project-title">Proyectos</h2>
          <p className="project-subtitle">
            Selecciona un proyecto para gestionar tickets
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="project-empty">
            <p>Esta compañía no tiene proyectos todavía</p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-icon">
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
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-action">Ver tablero →</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
