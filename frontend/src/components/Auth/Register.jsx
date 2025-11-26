import { useEffect, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyId: "",
  });

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    try {
      const fetchCompanies = fetch("")
        .then((response) => {
          response.json();
        })
        .catch((error) => {
          console.error("Error fetching companies:", error);
        });

      setCompanies(fetchCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Register: ${formData}`);
    onViewChange("companies");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Register</h1>
          <p className="register-subtitle">You're not register</p>
        </div>

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
                <option key={company.id} value={company.id}>
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
