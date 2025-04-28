import React from "react";


const HourDropdown = ({ value, onChange, name }) => {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const hour = i % 12 === 0 ? 12 : i % 12;
    const ampm = i < 12 ? "AM" : "PM";
    return `${hour}:00 ${ampm}`;
  });

  return (
    <select name={name} value={value} onChange={onChange} className="input" style={{  padding:"0px" }}>
      <option value="">Select time</option>
      {hours.map((time, index) => (
        <option key={index} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default HourDropdown;
