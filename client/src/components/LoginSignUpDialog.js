import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { LOGIN_USER } from '../utils/actions';
import { Api } from "../utils/api";


function LoginSignUpDialog({ toggleDialog }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and sign-up
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [, dispatch] = useStoreContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/user/login' : '/user';

    try {
      console.log('formdata',formData);
      console.log('enpoint',endpoint);
      console.log('enpoint',Api);
      const response = await Api.post(`${endpoint}`, formData);

      if (response.status === 200) {
        console.log('response',response);
        dispatch({ type: LOGIN_USER, login: true });
        navigate('/admin/availability'); // Navigate to the Admin route
        toggleDialog(); // Close the dialog
      } else {
       
        alert('An error occurred');
      }

      console.log('response',response);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to connect to the server.');
    }
  };

  return (
    <Modal show onHide={toggleDialog} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? 'Login' : 'Sign Up'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required={!isLogin}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginSignUpDialog;









