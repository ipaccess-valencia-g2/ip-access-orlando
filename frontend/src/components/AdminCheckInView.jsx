import React, { useState, useEffect } from 'react';

const AdminCheckInView = () => {
  const [devices, setDevices] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://3.15.153.52:3307/admin/devices'); 
        //{credentials: 'include'});
        const data = await res.json();
        setDevices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load devices:', err);
      }
    };
    fetchData();
  }, []);

  const handleConditionChange = (deviceId, newCondition) => {
    setDevices(prev =>
      prev.map(d =>
        d.deviceID === deviceId ? { ...d, condition: newCondition } : d
      )
    );
  };

  const handleCheckIn = async (device) => {
    try {
      const res = await fetch(
        `http://3.15.153.52:3307/admin/reservations/${device.reservationID}/checkin`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          //credentials: 'include',
          body: JSON.stringify({ condition: device.condition })
        }
      );
      if (res.ok) {
        setDevices(prev =>
          prev.map(d =>
            d.deviceID === device.deviceID
              ? { ...d, reservationID: null, isAvailable: 1 }
              : d
          )
        );
      } else {
        console.error('Check-in failed', await res.text());
      }
    } catch (err) {
      console.error('Check-in error:', err);
    }
  };


  const filteredDevices = devices.filter(
    (d) =>
      String(d.deviceID).toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(d.locationID).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.locationName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Device Check-In</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by device or location..."
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
              {/*<th className="border p-2">User ID</th>*/}
              <th className="border p-2">Device ID</th>
              {/*
               <th className="border p-2">Condition</th>
              <th className="border p-2">Action</th>
              */}
              <th className="border p-2">Location ID</th>
              <th className="border p-2">Location Name</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.map((device) => (
              <tr key={device.deviceID}>
                <td className="border p-2">{device.deviceID}</td>
                <td className="border p-2">{device.locationID}</td>
                <td className="border p-2">{device.locationName || '-'}</td>
                <td className="border p-2">
                  {device.reservationID ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={device.condition || 'Good'}
                        onChange={(e) =>
                          handleConditionChange(device.deviceID, e.target.value)
                        }
                        className="p-1 border rounded"
                      >
                        <option>Good</option>
                        <option>Damaged</option>
                        <option>Needs Maintenance</option>
                      </select>
                      <button
                        onClick={() => handleCheckIn(device)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Check In
                      </button>
                    </div>
                  ) : device.isAvailable === 1 ? (
                    'Available for Check Out'
                  ) : (
                    'Not Available'
                  )}
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