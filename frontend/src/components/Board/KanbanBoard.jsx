import { useEffect, useState } from "react";
import "./KanbanBoard.css";
import Navbar from "../Layouts/Navbar";
import TicketForm from "../Tickets/TicketForm";
import TicketCard from "../Tickets/TicketCard";
import UserStoryForm from "../UserStories/UserStoryForm";
import { ticketsAPI, userStoriesAPI } from "../../api/Client";

const KanbanBoard = ({ company, project, onViewChange }) => {
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [tickets, setTickets] = useState({
    active: [],
    in_progress: [],
    finished: [],
  });
  const [loading, setLoading] = useState(true);
  const [showUserStoryForm, setShowUserStoryForm] = useState(false);

  const fetchTicketsAndStories = async () => {
    try {
      setLoading(true);

      // Obtener historias de usuario del proyecto
      const userStoriesResponse = await userStoriesAPI.getByProject(
        project._id || project.id
      );
      const userStories = userStoriesResponse.body || [];

      // Obtener todos los tickets
      const ticketsResponse = await ticketsAPI.getAll();
      const allTickets = ticketsResponse.body || [];

      // Filtrar tickets que pertenecen a las historias de usuario de este proyecto
      const userStoryIds = userStories.map((us) => us._id);
      const projectTickets = allTickets.filter((ticket) =>
        userStoryIds.includes(ticket.userStory)
      );

      // Organizar tickets por estado
      const organizedTickets = {
        active: projectTickets
          .filter((t) => t.status === "active")
          .map((t) => ({
            ...t,
            id: t._id,
            userStoryTitle:
              userStories.find((us) => us._id === t.userStory)?.title ||
              "Sin US",
          })),
        in_progress: projectTickets
          .filter((t) => t.status === "in_progress")
          .map((t) => ({
            ...t,
            id: t._id,
            userStoryTitle:
              userStories.find((us) => us._id === t.userStory)?.title ||
              "Sin US",
          })),
        finished: projectTickets
          .filter((t) => t.status === "finished")
          .map((t) => ({
            ...t,
            id: t._id,
            userStoryTitle:
              userStories.find((us) => us._id === t.userStory)?.title ||
              "Sin US",
          })),
      };

      setTickets(organizedTickets);
    } catch (error) {
      console.error("Error al consultar tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      fetchTicketsAndStories();
    }
  }, [project]);

  const columns = [
    { id: "active", title: "Activo", color: "#3b82f6" },
    { id: "in_progress", title: "En Proceso", color: "#f59e0b" },
    { id: "finished", title: "Finalizado", color: "#10b981" },
  ];

  const handleDragStart = (e, ticket, status) => {
    setDraggedTicket({ ticket, fromStatus: status });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, toStatus) => {
    e.preventDefault();

    if (!draggedTicket) return;

    const { ticket, fromStatus } = draggedTicket;

    if (fromStatus === toStatus) {
      setDraggedTicket(null);
      return;
    }

    try {
      // Actualizar en la API
      await ticketsAPI.update(ticket.id, { status: toStatus });

      // Actualizar estado local
      setTickets((prev) => ({
        ...prev,
        [fromStatus]: prev[fromStatus].filter((t) => t.id !== ticket.id),
        [toStatus]: [...prev[toStatus], { ...ticket, status: toStatus }],
      }));

      console.log(`Ticket ${ticket.id} movido de ${fromStatus} a ${toStatus}`);
    } catch (error) {
      console.error("Error al actualizar ticket:", error);
      alert("Error al mover el ticket");
    }

    setDraggedTicket(null);
  };

  const handleTicketCreated = async (newTicket) => {
    try {
      // Crear ticket en la API
      const response = await ticketsAPI.create(newTicket);

      // Actualizar la vista
      fetchTicketsAndStories();
    } catch (error) {
      console.error("Error al crear ticket:", error);
      alert("Error al crear el ticket");
    }
  };

  const handleUserStoryCreated = async (userStoryData) => {
    try {
      await userStoriesAPI.create(userStoryData);
      alert("Historia de usuario creada exitosamente");
      setShowUserStoryForm(false);
      fetchTicketsAndStories();
    } catch (error) {
      console.error("Error al crear historia de usuario:", error);
      alert("Error al crear la historia de usuario");
    }
  };

  if (loading) {
    return (
      <div className="kanban-view">
        <Navbar
          onViewChange={onViewChange}
          title={project?.name}
          subtitle={company?.name}
          showBack={true}
          onBack={() => onViewChange("projects", { company })}
        />
        <div className="kanban-container">
          <div className="container">
            <h2>Cargando tickets...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kanban-view">
      <Navbar
        onViewChange={onViewChange}
        title={project?.name}
        subtitle={company?.name}
        showBack={true}
        onBack={() => onViewChange("projects", { company })}
      />

      <div
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 0",
        }}
      >
        <div className="container" style={{ display: "flex", gap: "1rem" }}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowUserStoryForm(true)}
          >
            + Nueva Historia de Usuario
          </button>
        </div>
      </div>

      <TicketForm
        projectId={project?.id || project?._id}
        onTicketCreated={handleTicketCreated}
      />

      <div className="kanban-container">
        <div className="container">
          <div className="kanban-board">
            {columns.map((column) => (
              <div key={column.id} className="kanban-column">
                <div
                  className="kanban-column-header"
                  style={{ borderBottomColor: column.color }}
                >
                  <h3 className="kanban-column-title">{column.title}</h3>
                  <span className="kanban-column-count">
                    {tickets[column.id]?.length || 0}
                  </span>
                </div>

                <div
                  className="kanban-column-content"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  {!tickets[column.id] || tickets[column.id].length === 0 ? (
                    <div className="kanban-column-empty">
                      <p>No hay tickets</p>
                    </div>
                  ) : (
                    tickets[column.id].map((ticket) => (
                      <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        status={column.id}
                        onDragStart={handleDragStart}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showUserStoryForm && (
        <UserStoryForm
          projectId={project._id || project.id}
          onClose={() => setShowUserStoryForm(false)}
          onSave={handleUserStoryCreated}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
