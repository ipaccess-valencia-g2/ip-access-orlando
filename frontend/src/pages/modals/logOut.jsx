import React from 'react';
import './modalStyles/LogoutModal.css';

const LogoutModal = ({ onClose, onConfirm }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="confirm-btn">
                        Yes, Log Out
                    </button>
                    <button onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
