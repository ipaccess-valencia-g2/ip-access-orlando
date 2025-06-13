import React, { useEffect, useState } from 'react';
import '../pages/styles/AdminPage.css';
const AdminCheckInView = () => {
  const [checkedOutDevices, setCheckedOutDevices] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, user: 'Jane Doe', device: 'iPad', condition: 'Good' },
      { id: 2, user: 'John Doe', device: 'Inseego MiFi X PRO 5G', condition: 'Good' },
      { id: 2, user: 'D’Angelo Torres', device: 'Dell Latitude 3550', condition: 'Good' },
    ];
    setCheckedOutDevices(mockData);
  }, []);

  const handleCheckIn = (id) => {
    setCheckedOutDevices((prev) => prev.filter((device) => device.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Device Check-In</h2>
      {checkedOutDevices.length === 0 ? (
        <p>No devices currently checked out.</p>
      ) : (
        <table className="device-table">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">User</th>
              <th className="border p-2">Device</th>
              <th className="border p-2">Condition</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {checkedOutDevices.map((device) => (
              <tr key={device.id}>
                <td className="border p-2">{device.user}</td>
                <td className="border p-2">{device.device}</td>
                <td className="border p-2">
                  <select defaultValue={device.condition} className="p-1 border rounded">
                    <option>Good</option>
                    <option>Damaged</option>
                    <option>Needs Maintenance</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleCheckIn(device.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
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