import React, { useState } from "react";
import { Alldata } from "../utils/api";

function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      setFile(null);
    } else {
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phonenumber", formData.phonenumber);
    data.append("address", formData.address);
    data.append("photo", file);

    try {
      const response = await Alldata.post("/joinus", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setError("");
        setFormData({ name: "", email: "", phonenumber: "", address: "" });
        setFile(null);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to submit the form. Please try again.");
    }
  };

  return (
<div className="px-2 custom-bckg-color">
  <h2 className="text-center mb-4 custom-card-title">Únete a Nuestro Equipo en JHP Digital</h2>
  <h3 className="text-center mb-4 text-dark">
    ¿Te apasiona la tecnología? ¿Tienes experiencia y conocimientos en la reparación y mantenimiento de computadores, consolas de videojuegos, redes o dispositivos electrónicos? ¡Entonces queremos conocerte! Completa el formulario a continuación y adjunta un archivo PDF con tus habilidades, experiencia y referencias profesionales. Revisaremos tu solicitud y nos pondremos en contacto contigo si tu perfil se ajusta a nuestras necesidades.
  </h3>
  <h3 className="text-center mb-4 text-dark">
    <strong>¿Por qué unirte a JHP Digital?</strong> Somos un nombre confiable en la industria de mantenimiento y reparación, con una sólida trayectoria que nos respalda. Nuestra plataforma conecta a técnicos calificados como tú con una amplia gama de clientes que necesitan servicios de alta calidad. Al unirte a nuestro equipo, tendrás acceso a una gran base de clientes mientras trabajas con un horario flexible.
  </h3>
  <h3 className="text-center mb-4 text-dark">
    En JHP Digital, cobramos una tarifa fija del 5% por servicio, asegurándonos de que conserves la mayor parte de tus ganancias mientras nosotros mantenemos y hacemos crecer nuestra plataforma para brindarte aún más oportunidades. ¡Da el siguiente paso en tu carrera uniéndote a una red profesional que valora tu experiencia!
  </h3>

  <div className="container p-4 bg-dark text-white rounded-4">

      
      <form onSubmit={handleSubmit} >
        <div className="form-group mb-3">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phonenumber">Tel movil:</label>
          <input
            type="tel"
            id="phonenumber"
            name="phonenumber"
            className="form-control"
            value={formData.phonenumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address">Direccion:</label>
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="photo">Adjutar archivo(max size:300K) (PDF only):</label>
          <input
            type="file"
            id="photo"
            name="photo"
            className="form-control"
            accept="application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>

  );
}

export default JoinUs;

