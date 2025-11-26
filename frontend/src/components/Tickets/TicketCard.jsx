import "./TicketCard.css";

const TicketCard = ({ ticket, onDragStart, status }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "badge-red";
      case "medium":
        return "badge-yellow";
      case "low":
        return "badge-gray";
      default:
        return "badge-gray";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case "high":
        return "Alta";
      case "medium":
        return "Media";
      case "low":
        return "Baja";
      default:
        return priority;
    }
  };

  return (
    <div
      className="ticket-card"
      draggable
      onDragStart={(e) => onDragStart(e, ticket, status)}
    >
      <div className="ticket-card-header">
        <h4 className="ticket-card-title">{ticket.title}</h4>
        <button className="ticket-card-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
          </svg>
        </button>
      </div>

      {ticket.description && (
        <p className="ticket-card-description">{ticket.description}</p>
      )}

      <div className="ticket-card-footer">
        <span className={`badge ${getPriorityClass(ticket.priority)}`}>
          {getPriorityText(ticket.priority)}
        </span>

        <div className="ticket-card-meta">
          {ticket.comments !== undefined && (
            <span className="ticket-card-comments">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{ticket.comments}</span>
            </span>
          )}
        </div>
      </div>

      {ticket.userStory && (
        <div className="ticket-card-user-story">US{ticket.userStory}</div>
      )}
    </div>
  );
};

export default TicketCard;
