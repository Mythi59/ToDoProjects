import { useEffect, useState } from "react";
import "./KanbanBoard.css";
import Navbar from "../Layouts/Navbar";
import TicketForm from "../Tickets/TicketForm";
import TicketCard from "../Tickets/TicketCard";
import { ticketsAPI } from "../../api/Client";

const KanbanBoard = ({ company, project, onViewChange }) => {
  const [draggedTicket, setDraggedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticketsAPI.getAll();
        setTickets(response.body);
      } catch (error) {
        console.error("Error al consultar tickets front: ", error);
      }
    };

    fetchTickets();
  }, []);

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
