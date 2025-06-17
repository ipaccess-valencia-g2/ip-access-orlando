// ReservationForm.jsx
import React, { useState, useEffect } from 'react';
import '../pages/styles/ReservationPage.css';

const reasonOptions = [
  "Job interview",
  "Homework / School",
  "Telehealth appointment",
  "Job applications / Resume building",
  "City Services / Permits",
  "Other",
];

const deviceTypes = ["Laptop", "Tablet", "Hotspot"];

const ReservationForm = () => {
  const [centers, setCenters] = useState([]);
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [message, setMessage] = useState('');
  const [userID, setUserID] = useState(null);
  const [firstName, setFirstName] = useState('');


  useEffect(() => {
    const loadCenters = async () => {
      try {
        const res = await fetch('http://18.223.161.174:3307/locations');
        const data = await res.json();
        setCenters(data.locations || []);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      }
    };
    loadCenters();
  }, []);

   useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:3307/user/me', {
      credentials: 'include',
      });

      if (!res.ok) throw new Error('Session expired or not logged in.');

      const data = await res.json();
      console.log("User is logged in! userID:", data.userID); // ✅
      setUserID(data.userID); // Optional: store it for use later
      setFirstName(data.firstName);
    } catch (err) {
      console.error('Failed to fetch user info:', err.message);
    }
  };

  fetchUser();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalReason = reason === 'Other' ? customReason : reason;

    const reservationData = {
      location,
      startDate,
      endDate,
      reason: finalReason,
      deviceType,
      //userID?
    };

    try {
      const res = await fetch('/reserve', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData),
      });

      if (res.ok) {
        setMessage('✅ Reservation submitted successfully!');
        setLocation('');
        setStartDate('');
        setEndDate('');
        setReason('');
        setCustomReason('');
        setDeviceType('');
      } else {
        setMessage('❌ Failed to submit reservation.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setMessage('❌ Network error submitting reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reserve-form">
      <h2 className="text-xl font-bold">Reservation Form</h2>
      <h5>Hello, {firstName}</h5>
      {/* Please remove "Hello" if irrelevant past checking session storage */}

      {/* Community Center Selection */}
      <div className="regfl">
        <label>Community Center:</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
          <option disabled value="">-- Select a Center --</option>
          {centers.map((center) => (
            <option key={center.locationID} value={center.name}>{center.name}</option>
          ))}
        </select>
      </div>

      {/* Start Date */}
      <div className="regfl">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      {/* End Date */}
      <div className="regfl">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || new Date().toISOString().split("T")[0]}
          max={
            startDate
              ? new Date(new Date(startDate).getTime() + 14 * 86400000)
                  .toISOString()
                  .split("T")[0]
              : ''
          }
          required
          disabled={!startDate} // Optional: disable until startDate is picked
        />
      </div>

      {/* Device Type Dropdown */}
      <div className="regfl">
        <label>Device Type:</label>
        <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
          <option value="" disabled>-- Select a Device Type --</option>
          {deviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Reason Dropdown + Optional Text Input */}
      <div className="regfl">
        <label>Why are you checking out this device today?</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} required>
          <option value="" disabled>-- Select a reason --</option>
          {reasonOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
        {reason === 'Other' && (
          <input
            type="text"
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            required
            className="mt-2"
            placeholder="Please describe your reason"
          />
        )}
      </div>

      {message && <p className="text-sm font-medium">{message}</p>}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
