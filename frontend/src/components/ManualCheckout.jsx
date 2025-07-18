import React, { useState } from 'react';

const ManualCheckout = () => {
  const [userId, setUserId] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://3.15.153.52:3307/admin/log-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          userId,
          deviceId,
          startTime: new Date().toISOString(),
          endTime: returnDate,
          reason
        })
      });

      if (!res.ok) {
        console.error('Manual checkout failed', await res.text());
      } else {
        setUserId('');
        setDeviceId('');
        setReturnDate('');
        setReason('');
        alert('Checkout logged.');
      }
    } catch (err) {
      console.error('Manual checkout error:', err);
    }
  };

  return (
    <div className="p-6 mt-8">
      <h2 className="text-xl font-bold mb-4">Manual Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="deviceId" className="block text-sm font-medium text-gray-700">Device ID</label>
            <input
              type="text"
              id="deviceId"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="Enter Device ID"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Return Date</label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for checkout"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualCheckout;