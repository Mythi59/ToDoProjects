import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import CompanyList from "./components/Company/CompanyList";
import ProjectList from "./components/Projects/ProjectList";
import KanbanBoard from "./components/Board/KanbanBoard";
import { useState } from "react";

const App = () => {
  const [currentView, setCurrentView] = useState("board");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleViewChange = (view, data = null) => {
    setCurrentView(view);
    if (data?.company) setSelectedCompany(data.company);
    if (data?.project) setSelectedProject(data.project);
  };

  return (
    <div className="app">
      {/* {currentView === "login" && <Login onViewChange={handleViewChange} />}
      {currentView === "register" && (
        <Register onViewChange={handleViewChange} />
      )} */}
      {currentView === "companies" && (
        <CompanyList onViewChange={handleViewChange} />
      )}
      {currentView === "projects" && (
        <ProjectList
          company={selectedCompany}
          onViewChange={handleViewChange}
        />
      )}
      {currentView === "board" && (
        <KanbanBoard
          company={selectedCompany}
          project={selectedProject}
          onViewChange={handleViewChange}
        />
      )}
    </div>
  );
};

export default App;
