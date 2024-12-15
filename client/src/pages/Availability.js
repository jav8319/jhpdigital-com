import React, { useEffect, useState } from "react";
import DayAvailability from "../components/Admin/Availability/DayAvailability"; // Child component for each day
import { getFreeTimeSlots } from "../utils/getFreeTimeSlots";
import {arrStringToNumb} from '../utils/convertArr';
import {arrNumbToString} from '../utils/convertArr';
import {Api} from '../utils/api';

function Availability() {
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [timeFreeSlots, setTimeFreeSlots] = useState([]);
  const [iip,setiip]=useState()
  const [ffp,setffp]=useState()
  const [intp,setintp]=useState()
  
  useEffect(() => {
    const fetchAvail = async () => {
      try {
        const response = await Api.get('/getavailability');
        if (response && response.data) {
          const myavailarray = response.data.availability
          const ii = response.data.Ihh
          const ff = response.data.Fhh
          const int= response.data.Imin
          if(myavailarray.length > 0&&ii&&ff&&int){
            setiip(ii)
            setffp(ff)
            setintp(int)
            const mynumbarr = arrStringToNumb(myavailarray)
            if(mynumbarr.length > 0){
              const freeSlots = getFreeTimeSlots(mynumbarr, int, ii, ff);
              setCurrentAvailability(mynumbarr);
              setTimeFreeSlots(freeSlots);           
            }
          }else if(myavailarray.length === 0){
            setiip(ii)
            setffp(ff)
            setintp(int)
          }
        }
      } catch (error) {
        console.error('Error fetching availability', error);
      }
    };
fetchAvail();
  }, []);

  const handleSubmit = async () => {
    const myavailarraystr = arrNumbToString(currentAvailability)
    try {
      const response = await Api.post('/crtavailability', myavailarraystr);
      if (response && response.data) {
        alert('Availability saved successfully');
      }
    } catch (error) {
      console.error('Error with POST request:', error);
    }
  };

  const deleteTimeSlot = (WeekDay, initialHour, finalHour) => {
    const updatedAvailability = currentAvailability.filter(
      (slot) =>
        !(slot.WeekDay === WeekDay && slot.InitialHour === initialHour && slot.FinalHour === finalHour)
    );
    setCurrentAvailability(updatedAvailability);
    if(updatedAvailability.length===0){
      setTimeFreeSlots([])
    }else{
      setTimeFreeSlots(getFreeTimeSlots(updatedAvailability, intp, iip, ffp));
    }
  };
  const addTimeSlot = (WeekDay, initialHour, finalHour) => {
    const newSlot = { WeekDay, InitialHour: initialHour, FinalHour: finalHour };
    const updatedAvailability = [...currentAvailability, newSlot];
    setCurrentAvailability(updatedAvailability);
    setTimeFreeSlots(getFreeTimeSlots(updatedAvailability, intp, iip, ffp));
  };

  return (
    <div className="bg-dark text-white">
    <div className="container p-4">
      <h2 className="text-center mb-4">Configura tu disponibilidad</h2>
      <div className="row">
        {[0, 1, 2, 3, 4, 5, 6].map((day) => (
          <div className="col-md-6 col-lg-4 mb-4" key={day}>
            <DayAvailability
              day={day}
              availability={currentAvailability.filter((slot) => slot.WeekDay === day)}
              freeSlots={timeFreeSlots.filter((slot) => slot.WeekDay === day)}
              onDelete={deleteTimeSlot}
              onAdd={addTimeSlot}
              ii={iip}
              ff={ffp}
              int={intp}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  </div>
  
  );
}

export default Availability;