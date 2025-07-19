import React, { useState, useEffect } from 'react';

const AdminCheckInView = () => {
  const [checkedOutDevices, setCheckedOutDevices] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3307/admin/reservations', {
          //credentials: 'include'
        });
        const data = await res.json();
        setCheckedOutDevices(data);
      } catch (err) {
        console.error('Failed to load reservations:', err);
      }
    };
    fetchData();
  }, []);

  const handleConditionChange = (reservationId, newCondition) => {
    setCheckedOutDevices(prev =>
      prev.map(r =>
        r.reservationID === reservationId ? { ...r, condition: newCondition } : r
      )
    );
  };

  const handleCheckIn = async (reservation) => {
    try {
      const res = await fetch(
        'http://3.15.153.52:3307/admin/reservations/${reservation.reservationID}/checkin',
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          //credentials: 'include',
          body: JSON.stringify({ condition: reservation.condition })
        }
      );
      if (res.ok) {
        setCheckedOutDevices(prev =>
          prev.filter(r => r.reservationID !== reservation.reservationID)
        );
      } else {
        console.error('Check-in failed', await res.text());
      }
    } catch (err) {
      console.error('Check-in error:', err);
    }
  };


  const filteredDevices = checkedOutDevices.filter(
    (r) =>
      String(r.userID).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(r.deviceID).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Device Check-In</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by user or device..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

   
      {filteredDevices.length === 0 ? (
        <p>No matching devices found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Device ID</th>
              <th className="border p-2">Condition</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.reservationID}>
                <td className="border p-2">{device.userID}</td>
                <td className="border p-2">{device.deviceID}</td>
                <td className="border p-2">
                  <select
                     value={device.condition || 'Good'}
                    onChange={(e) => handleConditionChange(device.reservationID, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option>Good</option>
                    <option>Damaged</option>
                    <option>Needs Maintenance</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleCheckIn(device)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Check In
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCheckInView;