// ReservationForm.jsx
import React, { useState } from 'react';

// List of community centers (full list)
const communityCenters = [
  "Callahan Neighborhood Center",
  "Hankins Park Neighborhood Center",
  "Northwest Neighborhood Center",
  "Rosemont Neighborhood Center",
  "Smith Neighborhood Center",
  "Citrus Square Neighborhood Center",
  "Engelwood Neighborhood Center",
  "Jackson Neighborhood Center",
  "L Claudia Allen Senior Center",
  "Grand Avenue Neighborhood Center",
  "Ivey Lane Neighborhood Center",
  "Langford Park Neighborhood Center",
  "Rock Lake Neighborhood Center",
  "Wadeview Neighborhood Center",
  "Dover Shores Neighborhood Center",
  "RISE Employment Training Facility",
  "Hispanic Office for Local Assistance",
];

// Preset reasons for checking out a device
const reasonOptions = [
  "Job interview",
  "Homework / School",
  "Telehealth appointment",
  "Job applications / Resume building",
  "City Services / Permits",
  "Other",
];

const ReservationForm = () => {
  // Form state
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [message, setMessage] = useState('');

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalReason = reason === 'Other' ? customReason : reason;

    const reservationData = {
      location,
      date,
      reason: finalReason,
    };

    try {
      const res = await fetch('/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (res.ok) {
        setMessage('✅ Reservation submitted successfully!');
        setLocation('');
        setDate('');
        setReason('');
        setCustomReason('');
      } else {
        setMessage('❌ Failed to submit reservation.');
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      setMessage('❌ Network error submitting reservation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md">
      <h2 className="text-xl font-bold">Reservation Form</h2>

      {/* Community Center Selection */}
      <div>
        <label className="block font-medium">Community Center:</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
          <option disabled value="">-- Select a Center --</option>
          {communityCenters.map((center, idx) => (
            <option key={idx} value={center}>{center}</option>
          ))}
        </select>
      </div>

      {/* Date Picker */}
      <div>
        <label className="block font-medium">Reservation Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]} // Today's date
          required
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Reason Dropdown + Conditional Input */}
      <div>
        <label className="block font-medium mb-1">Why are you checking out this device today?</label>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full border p-2 rounded"
        >
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
            className="w-full border p-2 rounded mt-2"
            placeholder="Please describe your reason"
          />
        )}
      </div>

      {/* Submission Message */}
      {message && <p className="text-sm font-medium">{message}</p>}

      {/* Submit Button */}
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
