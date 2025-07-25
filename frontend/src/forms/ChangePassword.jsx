import React, { useState } from 'react';
import './formStyles/ChangePassword.css';

const ChangePassword = ({ userID, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
            alert('Please fill in all password fields.');
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirmation don't match!");
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch(
                `http://3.15.153.52:3307/users/${userID}/password/${encodeURIComponent(formData.newPassword)}`,
                {
                    method: 'PUT',
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to change password');
            }

            const result = await response.json();

            if (onSave) onSave(result);
            onClose();

        } catch (error) {
            console.error('Change password error:', error);
            alert(error.message || 'Error changing password. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="panel-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    disabled={isProcessing}
                />

                <label htmlFor="newPassword">New Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    disabled={isProcessing}
                />

                <label htmlFor="confirmPassword">Confirm New Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isProcessing}
                />

                <div className="show-password-toggle">
                    <label htmlFor="showPassword">Show Password</label>
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(prev => !prev)}
                        disabled={isProcessing}
                    />
                </div>

                <div className="action-btn">
                    <button type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Saving...' : 'Save'}
                    </button>
                    <button type="button" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
