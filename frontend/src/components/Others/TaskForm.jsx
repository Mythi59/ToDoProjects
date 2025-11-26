import "./TaskForm.css";

const TaskForm = () => {
  return (
    <header className="app_header">
      <form>
        <input
          type="text"
          className="task_input"
          placeholder="Enter your task"
        />

        <div className="task_form_bottom_line">
          <div>
            <button className="tag">HTML</button>
            <button className="tag">CSS</button>
            <button className="tag">JS</button>
            <button className="tag">React</button>
          </div>
          <div>
            <select className="task_status">
              <option value="todo">to do</option>
              <option value="doing">doing</option>
              <option value="done">done</option>
            </select>
            <button type="submit" className="task_submit">
              + add task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
