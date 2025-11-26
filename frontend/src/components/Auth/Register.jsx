import { useEffect, useState } from "react";
import "./Register.css";
import API from "../../api/Client.js";

const Register = ({ onViewChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await API.companies.getAll();
        setCompanies(response.body || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Error al cargar las compañías");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.auth.register(formData);
      console.log("Registro exitoso:", response);
      alert("Usuario registrado exitosamente");
      onViewChange("login");
    } catch (error) {
      console.error("Error en registro:", error);
      alert(error.message || "Error al registrarse");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="register-container">
        <div className="register-card">
          <p>Cargando compañías...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Registro</h1>
          <p className="register-subtitle">Crea tu cuenta</p>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="label" htmlFor="name">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="companyId">
              Compañía
            </label>
            <select
              id="companyId"
              name="companyId"
              className="input"
              value={formData.companyId}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una compañía</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Registrarse
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-full"
            onClick={() => onViewChange("login")}
          >
            ← Volver al login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
