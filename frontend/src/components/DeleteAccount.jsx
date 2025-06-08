import React, { useState } from 'react';
import './componentStyles/DeleteAccount.css';

const DeleteAccount = ({ onClose, onConfirm }) => {
    // Local state to track deletion processing status
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle account deletion confirmation
    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            // Call backend endpoint to delete account
            const response = await fetch('/api/user/delete-account', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error('Account deletion failed');

            // Notify parent component of successful deletion
            onConfirm();

            // Close the modal after confirmation
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
            <div className="modal-actions">
                {/* Delete button triggers deletion and is disabled while processing */}
                <button
                    type="button"
                    className="danger"
                    onClick={handleDelete}
                    disabled={isProcessing}
                >
                    {isProcessing ? 'Deleting...' : 'Delete'}
                </button>

                {/* Cancel button closes modal and is disabled while processing */}
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
