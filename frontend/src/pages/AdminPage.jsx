// AdminPage.jsx
// Admin-facing page for logging devices and viewing status.
import React from 'react';
import AdminCheckInView from '../components/AdminCheckInView';

const AdminPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
      <AdminCheckInView />
    </div>
  );
};

export default AdminPage;
