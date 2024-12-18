import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import image13 from '../../Assets/formSeparator.png';
import { Alldata } from '../../utils/api';

function StepOForm({ formData, onNext, setFormData }) {
  const [myProvs, setMyProvs] = useState([]);
  const [myCities, setMyCities] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // For error handling

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await Alldata.get('/mycities');
        if (response && response.data) {
          const provinces = [];
          const cities = [];
          for (const elemobjcity of response.data.cities) {
            const { id, CityName, ProvinceID, myprovince } = elemobjcity;
            cities.push({ id, CityName, ProvinceID });
            if (!provinces.some((prov) => prov.id === myprovince.id)) {
              provinces.push(myprovince);
            }
          }
          setMyProvs(provinces);
          setMyCities(cities);
          setErrorMessage('');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Ocurrió un error inesperado. Intente de nuevo.');
        }
      }
    };
    fetchCities();
  }, []);

  const handleSelectProvince = (event) => {
    const eventValue = event.target.value;
    if (eventValue === '--opciones--') {
      setFormData({ ...formData, province: '', city: '' });
      return;
    }
    setFormData({ ...formData, province: eventValue, city: '' });
  };

  const handleSelectCity = (event) => {
    const eventValue = event.target.value;
    if (eventValue === '--opciones--') {
      setFormData({ ...formData, city: '' });
      return;
    }
    setFormData({ ...formData, city: eventValue });
  };

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
      {myProvs && myProvs.length > 0 && (
        <div className="mt-4">
          <label htmlFor="dropdownMenu" className="form-label text-light">
            Seleccione Depto
          </label>
          <select
            className="form-select"
            id="dropdownMenu"
            value={formData.province}
            onChange={handleSelectProvince}
          >
            <option>--opciones--</option>
            {myProvs.map((option) => (
              <option key={option.id} value={option.id}>
                {option.ProvinceName}
              </option>
            ))}
          </select>
        </div>
      )}
      {formData.province !== '' && myCities && myCities.length > 0 && (
        <div className="mt-4">
          <label htmlFor="dropdownMenu" className="form-label text-light">
            Seleccione ciudad
          </label>
          <select
            className="form-select"
            id="dropdownMenu"
            value={formData.city}
            onChange={handleSelectCity}
          >
            <option>--opciones--</option>
            {myCities
              .filter((c) => parseInt(c.ProvinceID) === parseInt(formData.province))
              .map((option2) => (
                <option key={`${option2.id}city`} value={option2.id}>
                  {option2.CityName}
                </option>
              ))}
          </select>
        </div>
      )}
      <img
        style={{ width: '100%', height: '5px', padding: '0', margin: '0px' }}
        src={image13}
        alt="separator"
      />
      <button
        type="button"
        className="btn btn-primary w-100"
        disabled={!formData.city || !formData.province}
        onClick={onNext}
      >
        Siguiente
      </button>
    </form>
  );
}

export default StepOForm;
