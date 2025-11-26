import "./Navbar.css";

const Navbar = ({ onViewChange, title, showBack, onBack, subtitle }) => {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-left">
          {showBack && (
            <button className="navbar-back" onClick={onBack}>
              ← Volver
            </button>
          )}
          <div className="navbar-titles">
            <h1 className="navbar-title">{title || "ToDoProjects"}</h1>
            {subtitle && <p className="navbar-subtitle">{subtitle}</p>}
          </div>
        </div>
        <button className="navbar-logout" onClick={() => onViewChange("login")}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
