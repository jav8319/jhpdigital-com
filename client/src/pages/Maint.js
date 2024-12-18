import React, { useState } from 'react';
import StepOneForm from '../components/MaintChld/StepOneForm';
import StepTwoType from '../components/MaintChld/StepTwoType';
import StepOform from '../components/MaintChld/StepOform';
import RecurringDetails from '../components/MaintChld/RecurringDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

function MaintForm() {
  const [formData, setFormData] = useState({
    name:'',
    phone: '',
    address: '',
    email: '',
    location: '',
    city: '',
    province: '',
    date: '',
    time: '',
    services: [],
    maintenanceType: '',
    recurrence: '',
    startDate: '',
  });

  const [step, setStep] = useState(1); // Step to control form flow

  const handleNext = () => setStep(step + 1);
  const handleBack = () => {setStep(step - 1); setFormData({ ...formData, services: [] })};

  const handleChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = () => {
    console.log('Final Form Data:', formData);
    alert('Formulario enviado con éxito');
    setStep(1); // Reset to the first step
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      Province: '',
      email: '',
      location: '',
      date: '',
      time: '',
      services: [],
      maintenanceType: '',
      recurrence: '',
    });
  };


  console.log('*******formData:**********', formData);

  return (
    <div className="px-2 custom-bckg-color">
      <h2 className="text-center mb-4 custom-card-title">Reserva tu Mantenimiento o Reparación</h2>
      <h3 className="text-center mb-4 text-dark">Reparamos y 
        hacemos mantenimiento a gran variedad de equipos, desde computadores, 
        portatiles y consolas de juego.Para negocios puede programar un 
        mantenimiento recurrente</h3>
      {step === 1 && (
        <StepOform setFormData={setFormData} onBack={handleBack} formData={formData} onChange={handleChange} onNext={handleNext} />
      )}
      {step === 2 && (
        <StepOneForm setFormData={setFormData} onBack={handleBack} formData={formData} onChange={handleChange} onNext={handleNext} />
      )}

      {step === 3 && (
        <StepTwoType
        setFormData={setFormData} 
        formData={formData}
          maintenanceType={formData.maintenanceType}
          onChange={(type) => handleChange({ maintenanceType: type })}
          onBack={handleBack}
          onNext={handleNext}
        />
      )}

      {step === 4 && (
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
// let servicespickedinform=formData.services;

// if(servicespickedinform.length>0){
//   setpickdev(true);
//   const findserv=servicespickedinform.map((serv) => {

//     return services.find((service) => service.taskCode === serv);
//   })

//   setpickeddevice(findserv[0].DeviceID);
// }