import { useState, useEffect } from "react";
import "../Company/CompanyForm.css"; // Reutilizamos los estilos

const ProjectForm = ({ project, companyId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // ✅ Corrección: useEffect para cargar datos cuando cambia project
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
      });
    } else {
      // Reset form cuando no hay project (modo crear)
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      companyId,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="company-form-overlay" onClick={onClose}>
      <div
        className="company-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="company-form-header">
          <h2 className="company-form-title">
            {project ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h2>
          <button className="company-form-close" onClick={onClose}>
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
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="company-form">
          <div className="form-group">
            <label className="label" htmlFor="name">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              placeholder="Ej: Sistema de Gestión Empresarial"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              name="description"
              className="input"
              placeholder="Describe el proyecto..."
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="company-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {project ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
