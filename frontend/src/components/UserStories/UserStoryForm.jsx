import { useState, useEffect } from "react";
import "./UserStoryForm.css";

const UserStoryForm = ({ userStory, projectId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    ticket: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchUserStory = async () => {
      if (userStory) {
        setFormData({
          title: userStory.title || "",
          description: userStory.description || "",
          priority: userStory.priority || "medium",
          ticket: {
            title: "",
            description: "",
          },
        });
      }
    };

    fetchUserStory();
  }, [userStory]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSave = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      projectId,
    };

    if (!userStory) {
      dataToSave.ticket = formData.ticket;
    }

    onSave(dataToSave);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("ticket.")) {
      const ticketField = name.split(".")[1];
      setFormData({
        ...formData,
        ticket: {
          ...formData.ticket,
          [ticketField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="user-story-form-overlay" onClick={onClose}>
      <div
        className="user-story-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="user-story-form-header">
          <h2 className="user-story-form-title">
            {userStory
              ? "Editar Historia de Usuario"
              : "Nueva Historia de Usuario"}
          </h2>
          <button className="user-story-form-close" onClick={onClose}>
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

        <form onSubmit={handleSubmit} className="user-story-form">
          <div className="form-section">
            <h3 className="form-section-title">Información de la Historia</h3>
            <p className="form-section-subtitle">
              Describe la historia de usuario
            </p>

            <div className="form-group">
              <label className="label" htmlFor="title">
                Título
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input"
                placeholder="Ej: Como usuario quiero poder..."
                value={formData.title}
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
                placeholder="Describe los detalles de la historia..."
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="priority">
                Prioridad
              </label>
              <select
                id="priority"
                name="priority"
                className="input"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          {!userStory && (
            <div className="form-section">
              <h3 className="form-section-title">Primer Ticket</h3>
              <p className="form-section-subtitle">
                Cada historia debe tener al menos un ticket
              </p>

              <div className="form-group">
                <label className="label" htmlFor="ticket.title">
                  Título del Ticket
                </label>
                <input
                  type="text"
                  id="ticket.title"
                  name="ticket.title"
                  className="input"
                  placeholder="Ej: Implementar funcionalidad..."
                  value={formData.ticket.title}
                  onChange={handleChange}
                  required={!userStory}
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="ticket.description">
                  Descripción del Ticket
                </label>
                <textarea
                  id="ticket.description"
                  name="ticket.description"
                  className="input"
                  placeholder="Describe el ticket..."
                  value={formData.ticket.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          )}

          <div className="user-story-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {userStory ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStoryForm;
