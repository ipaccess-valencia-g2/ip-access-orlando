// ReservationForm.jsx
import React, { useState, useEffect } from 'react';
import '../pages/styles/ReservationPage.css';
import { useNavigate } from 'react-router-dom';

const deviceTypes = ["Laptop", "Tablet", "Hotspot"];

const ReservationForm = () => {
  const navigate = useNavigate();
  const [centers, setCenters] = useState([]);
  const [reasons, setReasons] = useState([]);
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
        const res = await fetch('http://3.15.153.52:3307/locations');
        const data = await res.json();
        setCenters(data.locations || []);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      }
    };
    loadCenters();
  }, []);
  
  useEffect(() => {
    const loadReasons = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3307/reasons');
        const data = await res.json();
        setReasons(data.reasons || []);
      } catch (err) {
        console.error('Failed to fetch reasons:', err);
      }
    };
    loadReasons();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3307/user/me', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Session expired or not logged in.');

        const data = await res.json();
        console.log("User is logged in! userID:", data.userID);
        setUserID(data.userID);
        setFirstName(data.firstName);
      } catch (err) {
        console.error('Failed to fetch user info:', err.message);
      }
    };

    fetchUser();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);
  setMessage('');

  const finalReason = reason === 'Other' ? customReason : reason;

  const selectedCenter = centers.find(center => center.name === location);
  if (!selectedCenter) {
    setMessage(`Invalid location selected: ${location}`);
    console.error('Selected location not found in centers.');
    setIsSubmitting(false);
    return;
  }

  const locationID = selectedCenter.locationID;


const toESTMidnightISO = (dateStr) => {
  const date = new Date(dateStr + 'T00:00:00-05:00');
  return date.toISOString();
};

const startTime = toESTMidnightISO(startDate);
const endTime = toESTMidnightISO(endDate);

  console.log('Searching for devices with:', {
    type: deviceType,
    locationID,
    startTime,
    endTime,
  });

  let chosenDeviceID;

  try {
    const searchResponse = await fetch('http://3.15.153.52:3307/reserve/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: deviceType,
        locationID,
        startTime,
        endTime,
      }),
    });

    const resJson = await searchResponse.json();
    console.log("Device search response:", resJson);

    const deviceIDs = Array.isArray(resJson)
      ? resJson
      : Array.isArray(resJson.deviceIDs)
      ? resJson.deviceIDs
      : [];

    if (deviceIDs.length === 0) {
      setMessage('No devices available for the selected criteria.');
      setIsSubmitting(false);
      return;
    }

    chosenDeviceID = deviceIDs[Math.floor(Math.random() * deviceIDs.length)];
    console.log('Chosen device ID:', chosenDeviceID);

  } catch (err) {
    console.error('Device search error:', err);
    setMessage('Error during device search.');
    setIsSubmitting(false);
    return;
  }

  try {
    const reservationResponse = await fetch('http://3.15.153.52:3307/reserve', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceID: chosenDeviceID,
        locationID,
        userID,
        startTime,
        endTime,
        reason: finalReason,
      }),
    });

    const result = await reservationResponse.json();

    if (!reservationResponse.ok) {
      console.error('Reservation failed:', result);
      setMessage(`Error: ${result.error}`);
      setIsSubmitting(false);
      return;
    }

    console.log('Reservation submitted successfully:', result);
    setMessage('Reservation submitted successfully!');
    navigate('/confirmation', {state: {
		deviceID: chosenDeviceID,
		deviceType,
		startTime,
		endTime,
		locationID,
	},
});

  } catch (err) {
    console.error('Reservation error:', err);
    setMessage('Error submitting reservation.');
  } finally {
    setIsSubmitting(false);
  }
};




  return (
    <div className="reserve-form">
    {!userID ? (
      <p className="text-red-600 font-semibold">
        Please log in to make a reservation.
      </p>
    ) : (
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Reservation Form</h2>
        <h5>Logged in as: {firstName}</h5>

      {/* Community Center Selection */}
      <div className="regfl">
        <label>Community Center:</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)} required>
		<option disabled value="">-- Select a Center --</option>
		{centers.map(center => (
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
          disabled={!startDate}
        />
      </div>

      {/* Device Type */}
      <div className="regfl">
        <label>Device Type:</label>
        <select value={deviceType} onChange={(e) => setDeviceType(e.target.value)} required>
          <option value="" disabled>-- Select a Device Type --</option>
          {deviceTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Reason */}
      <div className="regfl">
        <label>Why are you checking out this device today?</label>
        <select value={reason} onChange={(e) => setReason(e.target.value)} required>
        <option disabled value="">-- Select a reason --</option>
        {reasons.map(reason => (
		<option key={reason.label} value={reason.label}>{reason.label}</option>
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
    )}
  </div>
);
};

export default ReservationForm;
