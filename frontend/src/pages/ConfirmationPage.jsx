// ConfirmationPage.jsx
// Displays a summary after a user successfully submits a reservation.

import React from 'react';
import './styles/ConfirmationPage.css';

const ConfirmationPage = () => {
  return (
    <div className="register-page-container text-center" >
      <h1>Success!</h1>
      <h2>You reserved an Apple iPad (10th Gen)!</h2>
      <p><strong>Device ID:</strong> 623724891736</p>
      <p><strong>Checkout date:</strong> June 8th, 2025</p>
      <p><strong>Return date:</strong> June 22nd, 2025</p>
      <p>Thank you for using ConnectOrlando!</p>
    </div>
  );
};

export default ConfirmationPage;