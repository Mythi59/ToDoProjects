import { useState, useEffect } from "react";
import "./ProjectList.css";
import Navbar from "../Layouts/Navbar";
import { projectsAPI } from "../../api/Client";

const ProjectList = ({ company, onViewChange }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await projectsAPI.getByProject(
          company._id || company.id
        );

        setProjects(
          response.body.map((project) => ({
            ...project,
            id: project._id,
          }))
        );
      } catch (error) {
        console.error("Error al obtener los proyectos:", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (company) {
      fetchProjects();
    }
  }, [company]);

  const handleProjectClick = (project) => {
    onViewChange("board", { company, project });
  };

  if (loading) {
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
            <h2 className="project-title">Cargando proyectos...</h2>
          </div>
        </div>
      </div>
    );
  }

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
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <h3 className="project-name">{project.name}</h3>
                {project.description && (
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#6b7280",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {project.description}
                  </p>
                )}
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
