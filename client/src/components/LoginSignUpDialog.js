import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { LOGIN_USER } from "../utils/actions";
import { Api } from "../utils/api";

function LoginSignUpDialog({ toggleDialog }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/user/login", formData);

      if (response.status === 200) {
        dispatch({
          type: LOGIN_USER,
          login: true,
          userType: response.data.userType,
        });
        navigate("/availability"); // Navigate to the Admin route
        toggleDialog(); // Close the dialog
      } else {
        alert("Ocurrio un error.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Usuario no autorizado.");
    }
  };

  const handleResetRequest = async () => {
    try {
      const response = await Api.post("/forgot-password", { email: resetEmail });
      if (response.status === 200) {
        setResetMessage("Se envio link a tu correo.");
        setResetError("");
      } else {
        setResetError("Algo salio mal.");
        setResetMessage("");
      }
    } catch (err) {
      setResetError("Error connecting to the server.");
      setResetMessage("");
      console.error("Error:", err);
    }
  };

  return (
    <Modal show onHide={toggleDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>{forgotPassword ? "Recuperar contrasena" : "Login"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!forgotPassword ? (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="ingresa email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contrasena</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="ingresa contrasena"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            <div className="text-center mt-3">
              <Button
                variant="link"
                onClick={() => setForgotPassword(true)}
                className="text-primary"
              >
                Recuperar?
              </Button>
            </div>
          </Form>
        ) : (
          <div>
            <Form.Group className="mb-3" controlId="formResetEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              className="w-100"
              onClick={handleResetRequest}
            >
              Enviar link
            </Button>
            {resetMessage && (
              <div className="alert alert-success mt-3">{resetMessage}</div>
            )}
            {resetError && (
              <div className="alert alert-danger mt-3">{resetError}</div>
            )}
            <div className="text-center mt-3">
              <Button
                variant="link"
                onClick={() => setForgotPassword(false)}
                className="text-primary"
              >
                Volver
              </Button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default LoginSignUpDialog;
