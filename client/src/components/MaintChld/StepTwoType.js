import React from 'react';
import { Form, Button } from 'react-bootstrap';

function StepTwoType({ maintenanceType, onChange, onBack, onNext }) {
  return (
    <Form className="custom4 p-4 bg-dark rounded">
      <Form.Group controlId="maintenanceType" className="mb-3">
        <Form.Label className='text-light'>Tipo de Mantenimiento:</Form.Label>
        <Form.Check
          type="radio"
          className='text-light'
          id="singleMaintenance"
          label="Una sola vez"
          value="Single"
          checked={maintenanceType === 'Single'}
          onChange={() => onChange('Single')}
        />
        <Form.Check
          type="radio"
          id="recurringMaintenance"
          className='text-light'
          label="Recurrente"
          value="Recurring"
          checked={maintenanceType === 'Recurring'}
          onChange={() => onChange('Recurring')}
        />
      </Form.Group>

      <Button variant="secondary" onClick={onBack} className="me-2">
        Atrás
      </Button>
      <Button variant="primary" onClick={onNext} disabled={!maintenanceType}>
        Siguiente
      </Button>
    </Form>
  );
}

export default StepTwoType;
