import { useState, useEffect } from "react";
import "./ProjectList.css";
import Navbar from "../Layouts/Navbar";
import ProjectForm from "./ProjectForm";
import { projectsAPI } from "../../api/Client";

const ProjectList = ({ company, onViewChange }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

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

  useEffect(() => {
    if (company) {
      fetchProjects();
    }
  }, [company]);

  const handleProjectClick = (project) => {
    onViewChange("board", { company, project });
  };

  const handleCreateClick = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditClick = (e, project) => {
    e.stopPropagation();
    setEditingProject(project);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleSaveProject = async (formData) => {
    try {
      if (editingProject) {
        await projectsAPI.update(editingProject.id, formData);
        alert("Proyecto actualizado exitosamente");
      } else {
        await projectsAPI.create(formData);
        alert("Proyecto creado exitosamente");
      }

      handleCloseForm();
      // ✅ Simplificar: solo llamar fetchProjects una vez
      fetchProjects();
    } catch (error) {
      console.error("Error al guardar proyecto:", error);
      alert("Error al guardar el proyecto");
    }
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
        <div
          className="project-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <h2 className="project-title">Proyectos</h2>
            <p className="project-subtitle">
              Selecciona un proyecto para gestionar tickets
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleCreateClick}>
            + Nuevo Proyecto
          </button>
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
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
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
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                    onClick={(e) => handleEditClick(e, project)}
                  >
                    Editar
                  </button>
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

      {showForm && (
        <ProjectForm
          project={editingProject}
          companyId={company._id || company.id}
          onClose={handleCloseForm}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
};

export default ProjectList;
