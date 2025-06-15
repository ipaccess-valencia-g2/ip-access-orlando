import React, { useState } from 'react';
import './formStyles/DeleteAccount.css';

const DeleteAccount = ({ userID, onClose, onConfirm }) => {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        setIsProcessing(true);
        try {
            const response = await fetch(`http://18.223.161.174:3307/users/${userID}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Account deletion failed');

            onConfirm();
            onClose();
        } catch (error) {
            console.error('Account deletion error:', error);
            alert('Failed to delete account. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="panel-container">
            <h2>Delete Account</h2>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="action-btn">
                <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Deleting...' : 'Delete'}
                </button>
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;
