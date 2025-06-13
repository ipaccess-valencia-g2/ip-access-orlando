// AdminPage.jsx
// Admin-facing page for logging devices and viewing status.
import React from 'react';
import AdminCheckInView from '../forms/AdminCheckInView';
import './styles/AdminPage.css';
import AdminCheckoutView from "../forms/AdminCheckoutView.jsx";

const AdminPage = () => {
  return (
    <div className="admin-container">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
      <AdminCheckInView />
      <AdminCheckoutView />
    </div>
  );
};

export default AdminPage;