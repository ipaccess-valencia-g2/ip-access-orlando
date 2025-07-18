import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './formStyles/Logout.css';

const Logout = ({ onClose }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        setIsSubmitting(true);
        try {
            const res = await fetch('http://3.15.153.52:3307/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (!res.ok) {
                throw new Error('Failed to log out');
            }

            // Clear user ID from local storage
            localStorage.removeItem('userID');

            // Redirect to log in after successful logout
            navigate('/login');
        } catch (err) {
            console.error('Logout error:', err);
            alert('Something went wrong while logging out.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="panel-container">
            <h2 id="logout-title">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>

            <div className="action-btn">
                <button
                    onClick={handleLogout}
                    className="confirm-btn"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging out...' : 'Yes, Log Out'}
                </button>
                <button
                    onClick={onClose}
                    className="cancel-btn"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;
