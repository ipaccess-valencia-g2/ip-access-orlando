import React, { useState } from 'react';
import './componentStyles/Logout.css';

const Logout = ({ onClose, onConfirm }) => {
    // State to manage logout button loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State to show error and success messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Logout handler: makes request to backend and manages UI state
    const handleLogout = async () => {
        setIsSubmitting(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            // Placeholder URL — replace with your real logout endpoint
            const response = await fetch('https://your-backend-api/logout', {
                method: 'POST',
                credentials: 'include', // ensures cookies/session are sent
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Attempt to read error message from response
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Logout failed. Please try again.');
            }

            // On success, display message and redirect after short delay
            setSuccessMessage('Logout successful!');
            setTimeout(() => {
                onConfirm?.(); // Optional: handle additional logic
                onClose?.();   // Optional: close modal or UI panel
                window.location.href = '/login'; // Redirect to login
            }, 1000);
        } catch (err) {
            // Display any errors that occur
            setErrorMessage(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="panel-container">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>

            {/* Conditional rendering of error and success messages */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}

            {/* Action buttons */}
            <div className="modal-actions">
                <button
                    onClick={handleLogout}
                    className={`confirm-btn ${isSubmitting ? 'disabled' : ''}`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging out...' : 'Yes, Log Out'}
                </button>
                <button
                    onClick={onClose}
                    className="cancel-btn"
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default Logout;
