// UserDashboard.jsx
// Central hub for logged-in users to view their reservations and details.

import React from 'react';
import './styles/UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="register-page-container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h1>Good morning John Doe!</h1>
      <p>Welcome to your dashboard. Here you can view your reservations and manage your account.</p>
      <h2>My Reservations</h2>
        <ul>
            <li>Reservation 1: Device A - Date: 2025-10-01</li>
            <li>Reservation 2: Device B - Date: 2025-10-05</li>
            <li>Reservation 3: Device C - Date: 2025-10-10</li>
        </ul>
      <h2>Account Details</h2>
      <p>Email:</p>
      <p>Phone Number:</p>
      <p>Address:</p>
      <h2>Actions</h2>
      <ul>
        <li><button>Edit Profile</button></li>
        <li><button>Change Password</button></li>
        <li><button>Logout</button></li>
        <li><button>Delete Account</button></li>
      </ul>
      <p>If you have any questions or need assistance, please contact support.</p>
      <p>Thank you for using our service!</p>
    </div>
  );
};

export default UserDashboard;