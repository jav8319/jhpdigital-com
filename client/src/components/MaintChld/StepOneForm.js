import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import image13 from '../../Assets/formSeparator.png';

function StepOneForm({ formData, onChange, onNext }) {
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

    // Handle multi-select for services
    if (name === 'services') {
      const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
      onChange({ services: options });
    } else {
      onChange({ [name]: value });
    }
  };

  return (
    <Form className="shadow-lg p-4 bg-dark rounded">
       <img style={{ width: "100%", height: "5px", padding: "0", margin: "0px" }} src={image13} alt="separator" />
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formNombre">
            <Form.Label>Nombre:</Form.Label>
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
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              placeholder="Escribe tu teléfono"
              value={formData.telefono}
              onChange={handleChange}
              pattern="[0-9]+"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="formDate">
            <Form.Label>Fecha:</Form.Label>
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
        <Col md={6}>
          <Form.Group controlId="formHour">
            <Form.Label>Hora:</Form.Label>
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
      </Row>

      <Form.Group controlId="formServices" className="mb-3">
        <Form.Label>Servicios:</Form.Label>
        <Form.Select
          name="services"
          value={formData.services}
          onChange={handleChange}
          multiple
          required
        >
          {services.map((service, idx) => (
            <option key={idx} value={service}>
              {service}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
<img style={{ width: "100%", height: "5px", padding: "0", margin: "0px" }} src={image13} alt="separator" />
      <Button variant="primary" onClick={onNext} className="w-100">
        Siguiente
      </Button>
    </Form>
  );
}

export default StepOneForm;
