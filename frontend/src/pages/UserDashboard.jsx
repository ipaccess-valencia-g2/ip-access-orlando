// UserDashboard.jsx
// Central hub for logged-in users to view their reservations and details.

import React, { useState, useEffect } from 'react';
import '../styles/global.css';
import './styles/UserDashboard.css';
import ProfileEdit from "../components/ProfileEdit.jsx";
import ChangePasswordPanel from "../components/ChangePassword.jsx";
import DeleteAccount from "../components/DeleteAccount.jsx";
import Logout from "../components/logout.jsx";

const UserDashboard = () => {

    // Dynamic states for user info and reservations (will be fetched)
    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);

    // Panel visibility states
    const [showEditPanel, setShowEditPanel] = useState(false);
    const [showPasswordPanel, setShowPasswordPanel] = useState(false);
    const [showLoginPanel, setShowLoginPanel] = useState(false);
    const [showLogoutPanel, setShowLogoutPanel] = useState(false);
    const [showDeletePanel, setShowDeletePanel] = useState(false);


    const fetchUserData = async () => {
        try {
            const userId = "hunter277"; // TODO:Replace with dynamic user ID logic

            // Fetch user info
            const userRes = await fetch(`http://localhost:3307/users/${userId}`);
            if (!userRes.ok) throw new Error('Failed to fetch user');
            const userData = await userRes.json();

            const userInfo = userData.userInfo?.[0];
            if (!userInfo) throw new Error('User not found');
            setUser(userInfo);

            // Fetch reservations for this user
            const resRes = await fetch(`http://localhost:3307/reservations/user/${userId}`);
            if (!resRes.ok) throw new Error('Failed to fetch reservations');
            const resData = await resRes.json();

            setReservations(resData.rows || []);

        } catch (err) {
            console.error('Dashboard fetch error:', err);
            setUser(null);
            setReservations([]);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Show/hide handlers for each panel
    const handleEditProfile = () => setShowEditPanel(true);
    const handleChangePasswordClick = () => setShowPasswordPanel(true);
    const handleLogoutClick = () => setShowLogoutPanel(true);
    const handleDeleteAccountClick = () => setShowDeletePanel(true);


    return (
        // Main container for dashboard content
        <div className="dashboard-container">

            {/* Header greeting the user*/}
            <header className="dashboard-header">
                <h1>Good morning {user.firstName || 'User'}!</h1>
                <p>Welcome to your dashboard. Here you can view your reservations and manage your account.</p>
            </header>

            {/* Section listing the user's reservations */}
            <section className="dashboard-section">
                <h2>My Reservations</h2>
                {reservations.length > 0 ? (
                    <ul>
                        {reservations.map((res, index) => (
                            <li key={index}>
                                Reservation {index + 1}: {res.device} - Date: {res.date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You have no reservations.</p>
                )}
            </section>

            {/* Section displaying user's account details */}
            <section className="dashboard-section">
                <h2>Account Details</h2>
                <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
                <p><strong>Phone Number:</strong> {user.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
            </section>

            {/* Section with buttons for common user actions */}
            <section className="dashboard-section">
                <h2>Actions</h2>

                {/* Hide action buttons when a panel is open */}
                {!showEditPanel && !showPasswordPanel && !showLoginPanel && !showLogoutPanel && !showDeletePanel && (
                    <div className="dashboard-actions-buttons">
                        <button onClick={handleEditProfile}>Edit Profile</button>
                        <button onClick={handleChangePasswordClick}>Change Password</button>
                        <button onClick={handleLogoutClick}>Logout</button>
                        <button onClick={handleDeleteAccountClick}>Delete Account</button>
                    </div>
                )}

                {/* Conditionally render each component panel */}
                <div>
                    {showEditPanel && (
                        <div style={{ marginTop: '12px' }}>
                            <ProfileEdit user={user} onClose={() => setShowEditPanel(false)} />
                        </div>
                    )}

                    {showPasswordPanel && (
                        <div style={{ marginTop: '12px' }}>
                            <ChangePasswordPanel onClose={() => setShowPasswordPanel(false)} />
                        </div>
                    )}

                    {showLogoutPanel && (
                        <div style={{ marginTop: '12px' }}>
                            <Logout onClose={() => setShowLogoutPanel(false)} />
                        </div>
                    )}

                    {showDeletePanel && (
                        <div style={{ marginTop: '12px' }}>
                            <DeleteAccount onClose={() => setShowDeletePanel(false)} />
                        </div>
                    )}
                </div>
            </section>

            {/* Footer with support message */}
            <footer className="dashboard-footer">
                <p>If you have any questions or need assistance, please contact support.</p>
                <p>Thank you for using our service!</p>
            </footer>
        </div>
    );
};

export default UserDashboard;
