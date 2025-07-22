import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styles/ConfirmationPage.css';

export default function ConfirmationPage() {
  const { state } = useLocation();
  const {
    deviceType,
    deviceID,
    startTime,
    endTime,
  } = state || {};

  if (!state) {
    return (
      <div className="confirmation-page-container text-center">
        <h1>Oops!</h1>
        <p>No reservation details found.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const formatESTDate = (isoString) => {
    const date = new Date(isoString);
    const options = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  };

  return (
    <div className="confirmation-page-container text-center">
      <h1>Success!</h1>
      <h2>You reserved a <strong>{deviceType}</strong> with the ID: {deviceID}</h2>

      <p><strong>Checkout date:</strong> {formatESTDate(startTime)}</p>
      <p><strong>Return date:</strong> {formatESTDate(endTime)}</p>

      <p>Thank you for using ConnectOrlando!</p>
      <Link to="/dashboard" className="btn">
        Back to Dashboard
      </Link>
    </div>
  );
}
