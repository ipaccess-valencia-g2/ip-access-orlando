import React, { useState } from 'react';
import './formStyles/Logout.css';

const Logout = ({ onClose, onConfirm }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogout = () => {
        setIsSubmitting(true);

        // TODO: Clear client-side session data here. Login itself does not hold any authenticated user state globally yet.

        onConfirm?.();

        // Redirect to login page
        window.location.href = '/login';
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
