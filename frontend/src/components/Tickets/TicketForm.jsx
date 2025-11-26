import { useState, useEffect } from "react";
import "./TicketForm.css";
import { userStoriesAPI } from "../../api/Client";

const TicketForm = ({ projectId, onTicketCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    userStoryId: "",
    priority: "medium",
  });

  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await userStoriesAPI.getAll();
        setUserStories(response.body);
      } catch (error) {
        console.error("Error al consultar los tickets front: ", error);
      }
    };

    fetchTickets();
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Enviar a la API
    console.log("Crear ticket:", formData);

    // Limpiar formulario
    setFormData({
      title: "",
      description: "",
      userStoryId: "",
      priority: "medium",
    });

    if (onTicketCreated) {
      onTicketCreated(formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ticket-form-container">
      <div className="container">
        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="ticket-form-row">
            <input
              type="text"
              name="title"
              className="input ticket-title-input"
              placeholder="Título del ticket"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="ticket-form-row">
            <textarea
              name="description"
              className="input ticket-description-input"
              placeholder="Descripción (opcional)"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="ticket-form-actions">
            <select
              name="userStoryId"
              className="input ticket-select"
              value={formData.userStoryId}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Historia de Usuario</option>
              {userStories.map((us) => (
                <option key={us.id} value={us.id}>
                  {us.title}
                </option>
              ))}
            </select>

            <select
              name="priority"
              className="input ticket-select-priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="high">Alta Prioridad</option>
              <option value="medium">Media Prioridad</option>
              <option value="low">Baja Prioridad</option>
            </select>

            <button type="submit" className="btn btn-primary ticket-submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Crear Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketForm;
