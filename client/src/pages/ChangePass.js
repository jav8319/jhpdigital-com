import React, { useState } from "react";
import { Api } from "../utils/api"; // Import the Api utility

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }

    try {
      const response = await Api.post("/changepass", { oldpassword: oldPassword, newpassword: newPassword });

      if (response && response.data) {
        setMessage("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || "An error occurred while changing the password.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      console.error("Error with POST request:", error);
    }
  };

  return (
    <div className="bg-dark text-white customheiht">
      <div className="container p-4 customwidth">
        <h2 className="text-center mb-4">Cambiar contrasena</h2>
        <div className="form-group customwidth mx-auto">
          <label>Actual:</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-3 customwidth mx-auto">
          <label>Nueva:</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-3 customwidth mx-auto">
          <label>Confirmar:</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Cambiar contrasena
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
