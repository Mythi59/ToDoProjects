import "./UserStoryCard.css";

const UserStoryCard = ({ userStory, onSelect }) => {
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "badge-red";
      case "medium":
        return "badge-yellow";
      case "low":
        return "badge-blue";
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
        return priority || "Sin prioridad";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="user-story-card"
      onClick={() => onSelect && onSelect(userStory)}
    >
      <div className="user-story-card-header">
        <h3 className="user-story-card-title">{userStory.title}</h3>
        <span className={`badge ${getPriorityClass(userStory.priority)}`}>
          {getPriorityText(userStory.priority)}
        </span>
      </div>

      {userStory.description && (
        <p className="user-story-card-description">{userStory.description}</p>
      )}

      <div className="user-story-card-footer">
        <span className="user-story-card-date">
          Creada: {formatDate(userStory.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default UserStoryCard;
