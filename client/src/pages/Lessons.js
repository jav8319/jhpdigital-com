import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import image13 from '../Assets/formSeparator.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function ClasesForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    email: '',
    personas: '',
    date: '',
    hour: '',
    method: '',
    service: '',
    additionalEmails: [], // To store additional emails
  });

  const services = ["Software Básico", "Redes", "Hardware", "Otro"];
  const dates = ["2024-11-28", "2024-11-29", "2024-12-01"];
  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'personas') {
      const count = parseInt(value, 10);
      const newEmails = [...formData.additionalEmails];
      if (!isNaN(count) && count > 1) {
        while (newEmails.length < count - 1) {
          newEmails.push(''); // Add empty emails if needed
        }
        while (newEmails.length > count - 1) {
          newEmails.pop(); // Remove extra emails if necessary
        }
      } else {
        newEmails.length = 0; // Reset additional emails if less than 2 personas
      }

      setFormData({ ...formData, personas: value, additionalEmails: newEmails });
    } else if (name.startsWith('additionalEmail')) {
      const index = parseInt(name.split('-')[1], 10);
      const newEmails = [...formData.additionalEmails];
      newEmails[index] = value;
      setFormData({ ...formData, additionalEmails: newEmails });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.method) {
      alert("Por favor selecciona cómo prefieres tomar tu clase (Zoom o En Persona).");
      return;
    }

    if (formData.method === 'Zoom' && formData.additionalEmails.some((email) => email.trim() === '')) {
      alert('Por favor, proporciona todos los correos electrónicos adicionales para Zoom.');
      return;
    }

    console.log('Form Submitted:', formData);
    alert('Formulario enviado con éxito');
  };

  return (
    <div className='custom-bckg-color'>
      <div className="container my-2">
        <h2 className="text-center mb-4 custom-card-title">Reserva tu Clase</h2>
        <h3 className="text-center mb-4 text-dark">Ofrecemos clases en software Microsoft, Excel, Word, mantenimiento de hardware.Puedes programar tu clase en persona o videoconferencia por Zoom</h3>
        
        
        
        
        
        
        <Form onSubmit={handleSubmit} className="shadow-lg p-4 bg-dark rounded">
          <img style={{ width: "100%", height: "5px", padding: "0", margin: "0px" }} src={image13} alt="separator" />
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formNombre">
                <Form.Label className='text-light'>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Escribe tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formTelefono">
                <Form.Label className='text-light'>Teléfono:</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="Escribe tu teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  pattern="[0-9]+" // HTML5 validation for numeric values
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDireccion">
                <Form.Label className='text-light'>Dirección:</Form.Label>
                <Form.Control
                  type="text"
                  name="direccion"
                  placeholder="Escribe tu dirección"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label className='text-light'>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Escribe tu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formPersonas">
                <Form.Label className='text-light'># Personas:</Form.Label>
                <Form.Control
                  type="number"
                  name="personas"
                  min="1"
                  placeholder="Número de personas"
                  value={formData.personas}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formDate">
                <Form.Label className='text-light'>Fecha:</Form.Label>
                <Form.Select
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una fecha</option>
                  {dates.map((date, idx) => (
                    <option key={idx} value={date}>
                      {date}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formHour">
                <Form.Label className='text-light'>Hora:</Form.Label>
                <Form.Select
                  name="hour"
                  value={formData.hour}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una hora</option>
                  {times.map((time, idx) => (
                    <option key={idx} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formService">
                <Form.Label className='text-light'>Servicio:</Form.Label>
                <Form.Select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service, idx) => (
                    <option key={idx} value={service}>
                      {service}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className='text-light'>¿Cómo prefieres tomar tu clase?</Form.Label>
            <Form.Check className='text-light'
              type="radio"
              id="zoom"
              label="Zoom"
              name="method"
              value="Zoom"
              checked={formData.method === 'Zoom'}
              onChange={handleChange}
            />
            <Form.Check className='text-light'
              type="radio"
              id="enPersona"
              label="En Persona"
              name="method"
              value="En Persona"
              checked={formData.method === 'En Persona'}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.method === 'Zoom' && formData.personas > 1 && (
            <>
              <Form.Label className='text-light'>Emails adicionales:</Form.Label>
              {formData.additionalEmails.map((email, index) => (
                <Form.Group controlId={`additionalEmail-${index}`} key={index} className="mb-3">
                  <Form.Control
                    type="email"
                    name={`additionalEmail-${index}`}
                    placeholder={`Correo electrónico adicional ${index + 1}`}
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              ))}
            </>
          )}

          <img style={{ width: "100%", height: "5px", padding: "0", margin: "0px" }} src={image13} alt="separator" />
          <Button type="submit" variant="primary" className="w-100">
            Reservar
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ClasesForm;
