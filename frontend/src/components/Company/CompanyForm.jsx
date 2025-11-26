import { useState, useEffect } from "react";
import "./CompanyForm.css";

const CompanyForm = ({ company, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    nit: "",
    phone: "",
    address: "",
    email: "",
  });

  // ✅ Corrección: useEffect para cargar datos cuando cambia company
  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        nit: company.nit || "",
        phone: company.phone || "",
        address: company.address || "",
        email: company.email || "",
      });
    } else {
      // Reset form cuando no hay company (modo crear)
      setFormData({
        name: "",
        nit: "",
        phone: "",
        address: "",
        email: "",
      });
    }
  }, [company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="company-form-overlay" onClick={onClose}>
      <div
        className="company-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="company-form-header">
          <h2 className="company-form-title">
            {company ? "Editar Compañía" : "Nueva Compañía"}
          </h2>
          <button className="company-form-close" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="company-form">
          <div className="form-group">
            <label className="label" htmlFor="name">
              Nombre de la Compañía
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              placeholder="Ej: Tech Solutions S.A."
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="nit">
              NIT
            </label>
            <input
              type="text"
              id="nit"
              name="nit"
              className="input"
              placeholder="Ej: 900123456-7"
              value={formData.nit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="phone">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="input"
              placeholder="Ej: +57 1 234 5678"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="address">
              Dirección
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="input"
              placeholder="Ej: Calle 100 #15-20, Bogotá"
              value={formData.address}
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
              placeholder="Ej: info@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="company-form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {company ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
