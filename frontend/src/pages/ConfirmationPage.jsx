// ConfirmationPage.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles/ConfirmationPage.css';

export default function ConfirmationPage() {
  // Grab the reservation payload from location.state
  const { state } = useLocation();
  const {
    deviceType,
    //deviceID,
    startDate,
    endDate,
  } = state || {};

  // Fallbacks if someone arrives here without state
  if (!state) {
    return (
      <div className="confirmation-page-container text-center">
        <h1>Oops!</h1>
        <p>No reservation details found.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  // Helper to prettify ISO dates (e.g. "2025-06-08")
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="confirmation-page-container text-center">
      <h1>🎉 Success!</h1>
      <h2>You reserved a <strong>{deviceType}</strong>!</h2>

      <p><strong>Checkout date:</strong> {formatDate(startDate)}</p>
      <p><strong>Return date:</strong> {formatDate(endDate)}</p>

      <p>Thank you for using ConnectOrlando!</p>
      <Link to="/dashboard" className="btn">
        Back to Dashboard
      </Link>
    </div>
  );
}
