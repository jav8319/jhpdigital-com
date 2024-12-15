import React, { useEffect, useState } from 'react';

function DayAvailability({ day, availability, freeSlots, onDelete, onAdd, ii, ff, int}) {
const [startHour, setStartHour] = useState(null);
const [endHour, setEndHour] = useState(null);
const [arrstarthour, setarrstarthour] = useState([])
const [arrendhour, setarrendhour] = useState([])

const mydays = [
{ daynum: 0, dayname: "Dom" },
{ daynum: 1, dayname: "Lun" },
{ daynum: 2, dayname: "Mar" },
{ daynum: 3, dayname: "Mie" },
{ daynum: 4, dayname: "Jue" },
{ daynum: 5, dayname: "Vie" },
{ daynum: 6, dayname: "Sab" },
];

const dayName = mydays.find((myday) => myday.daynum === day)?.dayname || "Unknown";

useEffect(() => {
  let freeSlotsArr = []
  if(freeSlots&&freeSlots.length>0){
    for (const element of freeSlots) {
      const arrlength = (element.FinalHour - element.InitialHour) / int
      if(arrlength&&arrlength>0){
        for (let index = 0; index < arrlength; index++) {
          const elementobj = (element.InitialHour*1) + index * int;
          freeSlotsArr.push(elementobj)
        }
      }
    }
  }
  if(freeSlotsArr.length === 0&&availability.length===0){
    let slots = [];
    let maxiterations = ((ff*1) - (ii*1)) / (int*1)
    for (let kk = 0; kk <=maxiterations; kk++) {
      const Starthourstr = ((ii*1)-(int*1))+(kk*(int*1))
      if(kk!==0){
        slots.push(Starthourstr);
      }
    }
  setarrstarthour(slots)
  }else{
  setarrstarthour(freeSlotsArr)
  }

}, [freeSlots,availability,ii,ff,int]);

const handleSelect = (e) => {
  let filteredSlots = []
  let timesfilteder = []
  const myselect = parseInt(e.target.value)
  setStartHour(myselect);
  if(freeSlots.length === 0&&availability.length===0){
    let slotsfinalhour = [];
    let maxiterationsf = ((ff*1) - (ii*1)) / (int*1)
    for (let kkk = 0; kkk <=maxiterationsf; kkk++) {
      const Finalhourstrf= ((ii*1))+(kkk*(int*1))
      if(kkk!==0){
      slotsfinalhour.push(Finalhourstrf);
      }
    }
    timesfilteder = slotsfinalhour.filter((Hour) => {
      let availablef = true
      if(Hour<=myselect){
      availablef = false
      }
      return availablef
    })
  }else{
    let freeSlotsArrff = []
    if(freeSlots&&freeSlots.length>0){
      for (const elementff of freeSlots) {
        const arrlengthff = (elementff.FinalHour - elementff.InitialHour) / int
        if(arrlengthff&&arrlengthff>0){
          for (let indexff = 1; indexff <= arrlengthff; indexff++) {
            const elementobjff = (elementff.InitialHour*1) + indexff * int;
            freeSlotsArrff.push(elementobjff)
          }
        }
  
      }
    }
    filteredSlots = freeSlotsArrff.filter((Hour) => {
      let available = true
      for (let index2 = 0; index2 < availability.length; index2++) {
        const element2 = availability[index2];
         if (myselect< element2.InitialHour) {
          if(Hour>element2.FinalHour){
            available = false
          break
          }
        }
      }
      if(Hour<=myselect){
        available = false
      }
      return available
      })
      timesfilteder = filteredSlots
  }
  setarrendhour(timesfilteder)
};

const handleAdd = () => {
  if (startHour && endHour && endHour > startHour) {
    onAdd(day, startHour, endHour);
    setStartHour(null);
    setEndHour(null);
  }
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
};

return (
  <div className="card custom-card-1">
    <div className="card-header bg-primary text-white">{dayName}</div>
    <div className="card-body">
      <ul className="list-unstyled">
        {availability.map((slot, index) => (
          <li key={index} className="d-flex justify-content-between align-items-center mt-1">
            {formatTime(slot.InitialHour)} - {formatTime(slot.FinalHour)}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(day, slot.InitialHour, slot.FinalHour)}
            >
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <label>
          Hr. Inicio:
          <select
            className="form-select mt-1"
            value={startHour || ''}
            onChange={handleSelect}
          >
            <option value="">Seleccione</option>
            {arrstarthour.map((slot, index) => (
              <option key={index} value={slot}>
                {formatTime(slot)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-3">
        <label>
          Hr. Fin:
          <select
            className="form-select mt-1"
            value={endHour || ''}
            onChange={(e) => setEndHour(parseInt(e.target.value))}
            disabled={!startHour}
          >
            <option value="">Seleccione</option>
            {arrendhour.map((slot, index) => (
              <option key={index} value={slot}>
                {formatTime(slot)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        className="btn btn-success mt-3"
        onClick={handleAdd}
        disabled={!startHour || !endHour || availability.length === 2}
      >
        Agregar Horario
      </button>
    </div>
  </div>
);
}

export default DayAvailability;
