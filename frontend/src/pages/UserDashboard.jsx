// UserDashboard.jsx
// Central hub for logged-in users to view their reservations and details.

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';
import './styles/UserDashboard.css';
import ProfileEdit from "../forms/ProfileEdit.jsx";
import ChangePasswordPanel from "../forms/ChangePassword.jsx";
import DeleteAccount from "../forms/DeleteAccount.jsx";
import Logout from "../forms/logout.jsx";
import Modal from "../components/common/Modal.jsx";


const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [reservations, setReservations] = useState([]);
    const [activePanel, setActivePanel] = useState(null); // 'edit' | 'password' | 'logout' | 'delete'
    const navigate = useNavigate();
    //const userID = localStorage.getItem('userID');
    const userID = 2;

    const fetchUserData = async () => {
        try {
            // Fetch user info
            const userRes = await fetch(`http://3.15.153.52:3307/users/${userID}`);
            if (!userRes.ok) throw new Error('Failed to fetch user');
            const userData = await userRes.json();

            if (!userData.userInfo || userData.userInfo.length === 0) throw new Error('User not found');
            setUser(userData.userInfo[0]);

            // Fetch reservations for this user
            const resRes = await fetch(`http://3.15.153.52:3307/reservations/${userID}`);
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

    if (!userID) {
        return (
            <div>
                <h1>Welcome to your Dashboard</h1>
                <p>Please log in to see your dashboard.</p>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="user-info-header">
                    <div className="avatar-placeholder" />
                    <div>
                        <h1>Good morning {user?.firstName || 'User'}!</h1>
                        <p>Welcome to your dashboard. Here you can view your reservations and manage your account.</p>
                    </div>
                </div>
            </header>

            <section className="dashboard-section">
                <h2>My Reservations</h2>
                {reservations.length > 0 ? (
                    <ul>
                        {reservations.map((res, i) => (
                            <li key={res.i}>
                                Location: {res.location}, Reason: {res.reason}, Date: {res.reservation_date}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reservations found.</p>
                )}
                <div className="dashboard-actions-buttons">
                    <button onClick={() => navigate('/reservation')}>Reserve a device</button>
                </div>
            </section>

            <section className="dashboard-section">
            <h2>Account Details</h2>
                <p><strong>Username:</strong> {user.username || 'Not provided'}</p>
                <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
                <p><strong>Phone Number:</strong> {user.phone || 'Not provided'}</p>
                <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
            </section>

            <section className="dashboard-section">
                <h2>Actions</h2>
                {activePanel === null && (
                    <div className="dashboard-actions-buttons">
                        <button onClick={() => setActivePanel('edit')}>Edit Profile</button>
                        <button onClick={() => setActivePanel('password')}>Change Password</button>
                        <button onClick={() => setActivePanel('logout')}>Logout</button>
                        <button onClick={() => setActivePanel('delete')}>Delete Account</button>
                    </div>
                )}

                {/* Modal logic based on active panel */}
                {activePanel === 'edit' && (
                    <Modal isOpen onClose={() => setActivePanel(null)}>
                        <ProfileEdit user={user} onClose={() => setActivePanel(null)} onSave={fetchUserData} />
                    </Modal>
                )}

                {activePanel === 'password' && (
                    <Modal isOpen onClose={() => setActivePanel(null)}>
                        <ChangePasswordPanel
                            userID={userID}
                            onClose={() => setActivePanel(null)}
                            onSave={fetchUserData}
                        />
                    </Modal>
                )}

                {activePanel === 'logout' && (
                    <Modal isOpen onClose={() => setActivePanel(null)}>
                        <Logout onClose={() => setActivePanel(null)} />
                    </Modal>
                )}

                {activePanel === 'delete' && (
                    <Modal isOpen onClose={() => setActivePanel(null)}>
                        <DeleteAccount onClose={() => setActivePanel(null)} />
                    </Modal>
                )}
            </section>

            <footer className="dashboard-footer">
                <p>If you have any questions or need assistance, please contact support.</p>
                <p>Thank you for using our service!</p>
            </footer>
        </div>
    );
};

export default UserDashboard;
