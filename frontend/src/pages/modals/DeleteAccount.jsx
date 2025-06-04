import React from 'react';
import './modalStyles/DeleteAccount.css';

const DeleteAccount = ({ onClose, onConfirm }) => {
    const handleDelete = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Delete Account</h2>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="modal-actions">
                    <button type="button" className="danger" onClick={handleDelete}>
                        Delete
                    </button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount;
