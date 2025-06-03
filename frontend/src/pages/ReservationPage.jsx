// ReservationPage.jsx
// Main reservation screen — includes form to borrow tablets.

import React from 'react';
import ReservationForm from '../forms/ReservationForm';
import './styles/ReservationPage.css';

const ReservationPage = () => {
  return (
    <div className="register-page-container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Reserve a Device</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservationPage;