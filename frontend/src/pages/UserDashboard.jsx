// UserDashboard.jsx
// Central hub for logged-in users to view their reservations and details.

import React, { useState } from 'react';
import './styles/UserDashboard.css';
import ProfileEdit from "./modals/ProfileEdit.jsx";
import ChangePasswordModal from "./modals/ChangePassword.jsx";
import DeleteAccount from "./modals/DeleteAccount.jsx";
import LogoutModal from "./modals/logOut.jsx";


// UserDashboard component
const UserDashboard = ({
                           // User object with personal info
                           user = {
                               firstName: 'John',
                               email: 'john.doe@example.com',
                               phone: '(123) 456-7890',
                               address: '123 Main St, Orlando, FL',
                           },

                           // Array of reservation objects; each has a device and date
                           reservations = [
                               { device: 'iPad Pro', date: '2025-10-01' },
                               { device: 'MacBook Air', date: '2025-10-05' },
                               { device: 'Android Tablet', date: '2025-10-10' },
                           ],

                       }) => {

    // Profile Edit modal overlay
    const [showEditModal, setShowEditModal] = useState(false);
    const [userData, setUserData] = useState(user);
    const handleEditProfile = () => setShowEditModal(true);

    const handleSaveProfile = (updatedUser) => {
        setUserData(updatedUser);
        // TODO: Add update logic here to save the updated profile to backend/server
        setShowEditModal(false);  // Close the modal after saving
    };

    // Change Password modal overlay
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const handleChangePasswordClick = () => setShowPasswordModal(true);

    const handleSavePassword = (passwordData) => {
        // TODO: Add password update logic here to save the updated password to backend/server
    };

    // Logout modal overlay
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => setShowLogoutModal(true);

    const handleConfirmLogout = () => {
        // TODO: Add your logout logic here
        setShowLogoutModal(false);
    };

    // Delete Account modal overlay
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteAccountClick = () => setShowDeleteModal(true);

    const handleConfirmDelete = () => {
        // TODO: Add deletion logic here to permanently delete the account
        setShowDeleteModal(false);
    };

    return (
        // Main container for dashboard content
        <div className="dashboard-container" style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>

            {/* Header greeting the user*/}
            <header className="dashboard-header">
                <h1>Good morning {user.firstName || 'User'}!</h1>
                <p>Welcome to your dashboard. Here you can view your reservations and manage your account.</p>
            </header>

            {/* Section listing the user's reservations */}
            <section className="dashboard-section">
                <h2>My Reservations</h2>
                {reservations.length > 0 ? (
                    // If reservations exist, map each to a list item showing device and date
                    <ul>
                        {reservations.map((res, index) => (
                            <li key={index}>
                                Reservation {index + 1}: {res.device} - Date: {res.date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    // If no reservations, show a message
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
                <div className="dashboard-actions-buttons">
                    <button onClick={handleEditProfile}>Edit Profile</button>
                    <button onClick={handleChangePasswordClick}>Change Password</button>
                    <button onClick={handleLogoutClick}>Logout</button>
                    <button onClick={handleDeleteAccountClick}>Delete Account</button>
                </div>
            </section>


            {/*Modal overlay for profile editing*/}
            {showEditModal && (
                <ProfileEdit
                    user={userData}
                    onClose={() => setShowEditModal(false)}
                    onSave={handleSaveProfile}
                />
            )}

            {/*Modal overlay for change password*/}
            {showPasswordModal && (
                <ChangePasswordModal
                    onClose={() => setShowPasswordModal(false)}
                    onSave={handleSavePassword}
                />
            )}

            {/*Modal overlay for change password*/}
            {showLogoutModal && (
                <LogoutModal
                    onClose={() => setShowLogoutModal(false)}
                    onConfirm={handleConfirmLogout}
                />
            )}

            {/*Modal overlay for delete account*/}
            {showDeleteModal && (
                <DeleteAccount
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleConfirmDelete}
                />
            )}


            {/* Footer with support message */}
            <footer className="dashboard-footer">
                <p>If you have any questions or need assistance, please contact support.</p>
                <p>Thank you for using our service!</p>
            </footer>
        </div>
    );
};

export default UserDashboard;
