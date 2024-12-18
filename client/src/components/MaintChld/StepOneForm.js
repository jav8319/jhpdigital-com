import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styling
import Select from 'react-select';
import image13 from '../../Assets/formSeparator.png';
import { Alldata } from '../../utils/api';

function StepOneForm({ formData, onChange, onBack, onNext, setFormData }) {
  const [jobs, setJobs] = useState([]);
  const [devices, setDevices] = useState([]);
  const [pickedDevice, setPickedDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const city = parseInt(formData.city);
        const province = parseInt(formData.province);
        const response = await Alldata.get(`/maintsservs?city=${city}&province=${province}`);

        if (response && response.data) {
          setJobs(response.data.maints);
          setDevices(response.data.mydevices);
          setErrorMessage('');
        } else {
          setErrorMessage('No se pudo obtener la información de los servicios.');
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('No hay trabajos disponibles para esta ciudad.');
        } else {
          setErrorMessage('Ocurrió un error inesperado. Intente de nuevo.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (formData.city && formData.province) {
      fetchServices();
    }
  }, [formData.city, formData.province]);

  const handleDeviceSelection = (deviceId) => {
    if (pickedDevice === deviceId) {
      setPickedDevice(null);
      setFormData({ ...formData, services: [] }); // Clear services if the device is deselected
    } else {
      setPickedDevice(deviceId);
      setFormData({ ...formData, services: [] }); // Reset services for the new device
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <form className="shadow-lg p-4 bg-dark rounded">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <img
        style={{ width: '100%', height: '5px', padding: '0', margin: '0px' }}
        src={image13}
        alt="separator"
      />

      {/* Form Inputs */}
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-light" htmlFor="formName">Nombre:</label>
            <input
              type="text"
              id="formName"
              className="form-control"
              name="name"
              placeholder="Escribe tu nombre"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-light" htmlFor="formPhone">Teléfono:</label>
            <input
              type="tel"
              id="formPhone"
              className="form-control"
              name="phone"
              placeholder="Escribe tu teléfono"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              pattern="[0-9]+"
              required
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
         <div className="col-md-6">
          <div className="form-group">
            <label className="text-light" htmlFor="formEmail">Email:</label>
            <input
              type="email"
              id="formEmail"
              className="form-control"
              name="email"
              placeholder="Escribe tu correo electrónico"
              value={formData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-light" htmlFor="formDir">Direccion:</label>
            <input
              type="text"
              id="formDir"
              className="form-control"
              name="address"
              placeholder="Escribe tu direcion"
              value={formData.address}
              onChange={(e) => onChange({ address: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="text-light" htmlFor="formMaint">Ubicacion mantenimiento:</label>
            <input
              type="tel"
              id="formMaint"
              className="form-control"
              name="location"
              placeholder="Escribe direccion de mantenimiento"
              value={formData.location}
              onChange={(e) => onChange({ location: e.target.value })}
              pattern="[0-9]+"
              required
            />
          </div>
        </div>
      </div>
      
      {/* Devices */}
      <div className="form-group">
        <h3 className="mb-3 d-flex text-light">Selecciona dispositivo</h3>
        <div className="d-flex flex-wrap">
          {devices.map((device) => (
            <div className="form-check me-3" key={device.id}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`device-${device.id}`}
                value={device.id}
                checked={pickedDevice === device.id}
                onChange={() => handleDeviceSelection(device.id)}
              />
              <label htmlFor={`device-${device.id}`} className="form-check-label text-light">
                {device.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      {pickedDevice && (
        <div className="form-group mb-3">
          <label className="text-light" htmlFor="formServices">Servicios:</label>
          <Select
            isMulti
            name="services"
            options={jobs
              .filter((job) => job.deviceID === pickedDevice)
              .map((job) => ({
                value: job.taskCode,
                label: job.name,
              }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) => {
              const selectedTaskCodes = selectedOptions.map((opt) => opt.value);
              setFormData({ ...formData, services: selectedTaskCodes });
            }}
          />
        </div>
      )}

      <img
        style={{ width: '100%', height: '5px', padding: '0', margin: '0px' }}
        src={image13}
        alt="separator"
      />

      {/* Buttons */}
      <button type="button" className="btn btn-primary w-100 me-2" onClick={onBack}>
        Atrás
      </button>
      <button
        type="button"
        className="btn btn-primary w-100"
        disabled={
          !formData.name ||
          !formData.phone ||
          !formData.email ||
          !formData.address ||
          !formData.services.length ||
          !formData.location
        }
        onClick={onNext}
      >
        Siguiente
      </button>
    </form>
  );
}

export default StepOneForm;
