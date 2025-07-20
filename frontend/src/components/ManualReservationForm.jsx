import React, { useState } from 'react';

const ManualReservationForm = () => {
  const [formData, setFormData] = useState({
    userId: '',
    deviceId: '',
    locationID: '',
    startTime: '',
    endTime: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const res = await fetch('http://3.15.153.52:3307/admin/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });
      if (!res.ok) {
        console.error('Manual reservation failed', await res.text());
      } else {
        alert('Reservation manually added.');
        setFormData({ userId: '', deviceId: '', locationID: '', startTime: '', endTime: '', reason: '' });
      }
    } catch (err) {
      console.error('Manual reservation error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Manual Reservation</h2>

      <input
        type="text"
        name="userId"
        placeholder="User ID"
        value={formData.userId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="deviceId"
        placeholder="Device ID"
        value={formData.deviceId}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="text"
        name="locationID"
        placeholder="Location ID"
        value={formData.locationID}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <input
        type="datetime-local"
        name="endTime"
        value={formData.endTime}
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
       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Reservation
      </button>
    </form>
  );
};

export default ManualReservationForm;
