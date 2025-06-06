// UserDashboard.jsx
// Central hub for logged-in users to view their reservations and details.

import React from 'react';
import './styles/UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="profile-picture" />
        <div className="user-info">
          <h2><strong>LaVonne Patoir</strong></h2>
        </div>
        <div className="settings-icon">⚙️</div>
      </div>

      <section className="reservations">
        <h3>My Reservations:</h3>
        <ul className="reservation-list">
          {[1, 2, 3].map((_, i) => (
            <li key={i} className="reservation-item">
              <div className="dot" />
              <div className="reservation-details">Reservation #{i + 1}</div>
              <div className="menu-dots">•••</div>
            </li>
          ))}
        </ul>
      </section>

      <section className="stats">
        <h3>My Stats:</h3>
        <div className="stats-container">
          <div className="bar-chart">
            <div className="bar-label">XXX</div>
            <div className="bar" />
          </div>
          <div className="pie-chart">
            {/* Placeholder circle to simulate pie chart */}
            <div className="pie-placeholder" />
          </div>
        </div>
      </section>

      <section className="past-reservations">
        <h3>Past Reservations:</h3>
        <div className="past-reservations-container">
          {[1, 2].map((_, i) => (
            <div key={i} className="past-reservation-card">
              <div className="card-header">
                <span>📅 Date</span>
                <span className="time-ago">14 hours</span>
              </div>
              <div className="card-body">
                <strong>Device Type</strong>
                <p>Details</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;