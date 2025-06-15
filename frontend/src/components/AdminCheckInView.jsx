import React, { useState, useEffect } from 'react';

const AdminCheckInView = () => {
  const [checkedOutDevices, setCheckedOutDevices] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockData = [
      { id: 1, user: 'Jane Doe', device: 'iPad', condition: 'Good' },
      { id: 2, user: 'John Doe', device: 'Inseego MIFI X PRO 5G', condition: 'Good' },
      { id: 3, user: 'Johnny Doe', device: 'Dell Latitude 3550', condition: 'Good' },
      { id: 4, user: 'Emily White', device: 'iPad', condition: 'Good' },
    ];
    setCheckedOutDevices(mockData);
  }, []);

  const handleConditionChange = (deviceId, newCondition) => {
    setCheckedOutDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId ? { ...device, condition: newCondition } : device
      )
    );
  };

  const handleCheckIn = (deviceToCheckIn) => {
    console.log(
      `Checking in device ID: ${deviceToCheckIn.id} for user ${deviceToCheckIn.user} with final condition: ${deviceToCheckIn.condition}`
    );
    setCheckedOutDevices((prev) =>
      prev.filter((device) => device.id !== deviceToCheckIn.id)
    );
  };


  const filteredDevices = checkedOutDevices.filter(
    (device) =>
      device.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.device.toLowerCase().includes(searchTerm.toLowerCase())
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
              <th className="border p-2">User</th>
              <th className="border p-2">Device</th>
              <th className="border p-2">Condition</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.id}>
                <td className="border p-2">{device.user}</td>
                <td className="border p-2">{device.device}</td>
                <td className="border p-2">
                  <select
                    value={device.condition}
                    onChange={(e) => handleConditionChange(device.id, e.target.value)}
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