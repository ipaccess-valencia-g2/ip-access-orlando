// ReservationPage.jsx
// Main reservation screen — includes form to borrow tablets.

import React from 'react';
import ReservationForm from '../forms/ReservationForm';
import './styles/ReservationPage.css';

const ReservationPage = () => {
  return (
    <div className="reserve-container" >
      <h1>Reserve a Device</h1>
      <ReservationForm />
    </div>
  );
};

export default ReservationPage;