import React, { useState } from 'react';
import './componentStyles/ChangePassword.css';

const ChangePassword = ({ onClose, onSave }) => {
    // Local state for password fields
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit password change request to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for matching new passwords
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirmation don't match!");
            return;
        }

        try {
            const response = await fetch('/api/user/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                }),
            });

            if (!response.ok) throw new Error('Failed to change password');

            const result = await response.json();

            // Notify parent about successful password change
            onSave(result);
            onClose();
        } catch (error) {
            console.error('Change password error:', error);
            alert('Error changing password. Please try again.');
        }
    };

    return (
        <div className="panel-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                {/* Current password input */}
                <label>Current Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                />

                {/* New password input */}
                <label>New Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                />

                {/* Confirm new password input */}
                <label>Confirm New Password:</label>
                <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />

                {/* Toggle password visibility */}
                <div className="show-password-toggle">
                    <label htmlFor="showPassword">Show Password</label>
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={() => setShowPassword(prev => !prev)}
                    />
                </div>

                {/* Modal action buttons */}
                <div className="modal-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
