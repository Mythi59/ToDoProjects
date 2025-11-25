import "./App.css";
import TaskForm from "./components/TaskForm";

const App = () => {
  return (
    <div className="app">
      <TaskForm />
      <div className="app_main">
        <section className="task_colum">Section 1</section>
        <section className="task_colum">Section 2</section>
        <section className="task_colum">Section 3</section>
      </div>
    </div>
  );
};

export default App;
