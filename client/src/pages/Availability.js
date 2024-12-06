import React, { useEffect, useState } from "react";
import DayAvailability from "../components/Admin/Availability/DayAvailability"; // Child component for each day
import { getFreeTimeSlots } from "../utils/getFreeTimeSlots";

function Availability() {
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [timeFreeSlots, setTimeFreeSlots] = useState([]);

  useEffect(() => {
    const availability = [
      { day: 0, InitialHour: 780, FinalHour: 960 },
      { day: 1, InitialHour: 360, FinalHour: 630 },
      { day: 1, InitialHour: 810, FinalHour: 1020 },
      { day: 2, InitialHour: 780, FinalHour: 1080 },
      { day: 3, InitialHour: 690, FinalHour: 1065 },
      { day: 4, InitialHour: 360, FinalHour: 1080 },
      { day: 5, InitialHour: 480, FinalHour: 765 },
      { day: 5, InitialHour: 780, FinalHour: 960 },
    ];

    const freeSlots = getFreeTimeSlots(availability, 15, 360, 1080);
    setCurrentAvailability(availability);
    setTimeFreeSlots(freeSlots);
  }, []);

  const deleteTimeSlot = (day, initialHour, finalHour) => {
    const updatedAvailability = currentAvailability.filter(
      (slot) =>
        !(slot.day === day && slot.InitialHour === initialHour && slot.FinalHour === finalHour)
    );
    setCurrentAvailability(updatedAvailability);
    setTimeFreeSlots(getFreeTimeSlots(updatedAvailability, 15, 360, 1080));
  };

  const addTimeSlot = (day, initialHour, finalHour) => {
    const newSlot = { day, InitialHour: initialHour, FinalHour: finalHour };
    const updatedAvailability = [...currentAvailability, newSlot];
    setCurrentAvailability(updatedAvailability);
    setTimeFreeSlots(getFreeTimeSlots(updatedAvailability, 15, 360, 1080));
  };

  return (
    <div>
      <h2>Manage Your Availability</h2>
      {[0, 1, 2, 3, 4, 5, 6].map((day) => (
        <DayAvailability
          key={day}
          day={day}
          availability={currentAvailability.filter((slot) => slot.day === day)}
          freeSlots={timeFreeSlots.filter((slot) => slot.day === day)}
          onDelete={deleteTimeSlot}
          onAdd={addTimeSlot}
        />
      ))}
    </div>
  );
}

export default Availability;
