import { useParams} from 'react-router-dom';
import React, { useState } from "react";
import {Api} from '../utils/api';

function Resetpass() {
  
  const { token} = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await Api.post(`/respass/${token}`, { password: newPassword });

      if (response && response.data) {
        alert("Se cambio contrasena!");
        window.location.href = '/';

      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "Ocurrio un error.");
      } else {
        setMessage("Ocurrio un error.");
      }
      console.error("Error with POST request:", error);
    }
  };

  return (
    <div className="bg-dark text-white customheiht">
      <div className="container p-4">
        <h2 className="text-center mb-4">Nueva Contrasena</h2>
        <div className="form-group mt-3 customwidth mx-auto">
          <label>Ingresa nueva contrsena:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-3 customwidth mx-auto">
          <label>Confirmar contrasena:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {message && <div className="alert alert-info mt-3 customwidth mx-auto">{message}</div>}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Cambiar Contrasena
          </button>
        </div>
      </div>
    </div>
  );

}

export default Resetpass