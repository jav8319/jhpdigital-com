import React from 'react';
import { Form, Button } from 'react-bootstrap';

function RecurringDetails({ formData, onChange, onBack, onSubmit }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  console.log('RecurringDetails formData:', formData);

  return (
    <Form>
      {formData.maintenanceType!=='Single'&&<Form.Group controlId="recurrence" className="mb-3">
        <Form.Label>Frecuencia:</Form.Label>
        <Form.Select
          name="recurrence"
          value={formData.recurrence}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona la frecuencia</option>
          <option value="Monthly">Mensual</option>
          <option value="Weekly">Semanal</option>
          <option value="Biweekly">Quincenal</option>
        </Form.Select>
      </Form.Group>}

      <Form.Group controlId="startDate" className="mb-3">
        <Form.Label>Fecha de Inicio:</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="secondary" onClick={onBack} className="me-2">
        Atrás
      </Button>
      <Button variant="primary" onClick={onSubmit}>
        Enviar
      </Button>
    </Form>
  );
}

export default RecurringDetails;
