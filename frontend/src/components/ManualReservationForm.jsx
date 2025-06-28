import React, { useState } from 'react';

const ManualReservationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    device: '',
    date: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend or update state
    console.log('Reservation submitted:', formData);
    alert('Reservation manually added.');
    setFormData({ name: '', device: '', date: '', reason: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Manual Reservation</h2>

      <input
        type="text"
        name="name"
        placeholder="Resident Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="device"
        placeholder="Device ID or Name"
        value={formData.device}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="reason"
        placeholder="Reason for Reservation"
        value={formData.reason}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Reservation
      </button>
    </form>
  );
};

export default ManualReservationForm;
