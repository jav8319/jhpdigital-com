import React, { useState } from "react";

function DayAvailability({ day, availability, freeSlots, onDelete, onAdd }) {
  const [startHour, setStartHour] = useState(null);
  const [endHour, setEndHour] = useState(null);

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
    <div>
      <h3>{dayName}</h3>
      <ul>
        {availability.map((slot, index) => (
          <li key={index}>
            {formatTime(slot.InitialHour)} - {formatTime(slot.FinalHour)}{" "}
            <button onClick={() => onDelete(day, slot.InitialHour, slot.FinalHour)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div>
        <label>
          Start Time:
          <select
            value={startHour || ""}
            onChange={(e) => setStartHour(parseInt(e.target.value))}
          >
            <option value="">Select</option>
            {freeSlots.map((slot) =>
              Array.from({ length: (slot.FinalHour - slot.InitialHour) / 15 }, (_, i) => {
                const time = slot.InitialHour + i * 15;
                return (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                );
              })
            )}
          </select>
        </label>
        <label>
          End Time:
          <select
            value={endHour || ""}
            onChange={(e) => setEndHour(parseInt(e.target.value))}
            disabled={!startHour}
          >
            <option value="">Select</option>
            {startHour &&
              freeSlots.map((slot) =>
                Array.from(
                  {
                    length: (slot.FinalHour - Math.max(slot.InitialHour, startHour)) / 15,
                  },
                  (_, i) => {
                    const time = Math.max(slot.InitialHour, startHour) + (i + 1) * 15;
                    return (
                      <option key={time} value={time}>
                        {formatTime(time)}
                      </option>
                    );
                  }
                )
              )}
          </select>
        </label>
        <button onClick={handleAdd} disabled={!startHour || !endHour}>
          Add Slot
        </button>
      </div>
    </div>
  );
}

export default DayAvailability;
