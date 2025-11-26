import { useState } from "react";
import "./KanbanBoard.css";
import Navbar from "../Layouts/Navbar";
import TicketForm from "../Tickets/TicketForm";
import TicketCard from "../Tickets/TicketCard";

const KanbanBoard = ({ company, project, onViewChange }) => {
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [tickets, setTickets] = useState({
    active: [
      {
        id: 1,
        title: "Implementar sistema de login",
        userStory: 1,
        comments: 2,
        priority: "high",
        description: "Crear formulario de login con validaciones",
      },
      {
        id: 2,
        title: "Crear dashboard principal",
        userStory: 1,
        comments: 0,
        priority: "medium",
        description: "Diseñar e implementar el dashboard",
      },
    ],
    in_progress: [
      {
        id: 3,
        title: "Diseño de reportes",
        userStory: 2,
        comments: 5,
        priority: "high",
        description: "Crear mockups de reportes",
      },
      {
        id: 4,
        title: "API de estadísticas",
        userStory: 2,
        comments: 3,
        priority: "medium",
      },
    ],
    finished: [
      {
        id: 5,
        title: "Setup inicial del proyecto",
        userStory: 1,
        comments: 1,
        priority: "low",
      },
      {
        id: 6,
        title: "Configuración de base de datos",
        userStory: 1,
        comments: 2,
        priority: "low",
      },
    ],
  });

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

  const handleDrop = (e, toStatus) => {
    e.preventDefault();

    if (!draggedTicket) return;

    const { ticket, fromStatus } = draggedTicket;

    if (fromStatus === toStatus) {
      setDraggedTicket(null);
      return;
    }

    // Actualizar estado de tickets
    setTickets((prev) => ({
      ...prev,
      [fromStatus]: prev[fromStatus].filter((t) => t.id !== ticket.id),
      [toStatus]: [...prev[toStatus], ticket],
    }));

    // TODO: Actualizar en la API
    console.log(`Ticket ${ticket.id} movido de ${fromStatus} a ${toStatus}`);

    setDraggedTicket(null);
  };

  const handleTicketCreated = (newTicket) => {
    // TODO: Enviar a la API y obtener el ticket creado con ID
    const ticket = {
      ...newTicket,
      id: Date.now(),
      comments: 0,
    };

    setTickets((prev) => ({
      ...prev,
      active: [...prev.active, ticket],
    }));
  };

  return (
    <div className="kanban-view">
      <Navbar
        onViewChange={onViewChange}
        title={project?.name}
        subtitle={company?.name}
        showBack={true}
        onBack={() => onViewChange("projects")}
      />

      <TicketForm
        projectId={project?.id}
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
                    {tickets[column.id].length}
                  </span>
                </div>

                <div
                  className="kanban-column-content"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id)}
                >
                  {tickets[column.id].length === 0 ? (
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
    </div>
  );
};

export default KanbanBoard;
