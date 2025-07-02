import React, { useState } from 'react';
import './formStyles/Logout.css';

const Logout = ({ onClose, onConfirm }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogout = () => {
        setIsSubmitting(true);

        // ✅ Clear client-side session data
        localStorage.removeItem('userID');
        
        onConfirm?.();

        // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <div className="panel-container">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>

            <div className="modal-actions">
                <button
                    onClick={handleLogout}
                    className={`confirm-btn ${isSubmitting ? 'disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging out...' : 'Yes, Log Out'}
                </button>
                <button onClick={onClose} className="cancel-btn" disabled={isSubmitting}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;