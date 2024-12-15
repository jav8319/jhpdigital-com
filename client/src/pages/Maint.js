import React, { useState } from 'react';
import StepOneForm from '../components/MaintChld/StepOneForm';
import StepTwoType from '../components/MaintChld/StepTwoType';
import RecurringDetails from '../components/MaintChld/RecurringDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function MaintForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    email: '',
    personas: '',
    date: '',
    hour: '',
    services: [],
    maintenanceType: '',
    recurrence: '',
    startDate: '',
  });

  const [step, setStep] = useState(1); // Step to control form flow

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    alert('Formulario enviado con éxito');
    setStep(1); // Reset to the first step
    setFormData({
      nombre: '',
      telefono: '',
      direccion: '',
      email: '',
      personas: '',
      date: '',
      hour: '',
      services: [],
      maintenanceType: '',
      recurrence: '',
      startDate: '',
    });
  };

  return (
    <div className="px-2 custom-bckg-color">
      <h2 className="text-center mb-4 custom-card-title">Reserva tu Mantenimiento o Reparación</h2>
      <h3 className="text-center mb-4 text-dark">Reparamos y 
        hacemos mantenimiento a gran variedad de equipos, desde computadores, 
        portatiles y consolas de juego.Para negocios puede programar un 
        mantenimiento recurrente</h3>
      {step === 1 && (
        <StepOneForm formData={formData} onChange={handleChange} onNext={handleNext} />
      )}

      {step === 2 && (
        <StepTwoType
          maintenanceType={formData.maintenanceType}
          onChange={(type) => handleChange({ maintenanceType: type })}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {step === 3 && (
        <RecurringDetails
          formData={formData}
          onChange={handleChange}
          onBack={handleBack}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default MaintForm;
