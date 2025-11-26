import { useState } from "react";
import "./Login.css";
import API from "../../api/Client.js";

const Login = ({ onViewChange }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.auth.login(formData);
      console.log("Login exitoso:", response);

      onViewChange("companies");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">ToDoProject</h1>
          <p className="login-subtitle">Prueba</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="input"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              placeholder="*******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Iniciar Sesión
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-full"
            onClick={() => onViewChange("register")}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
