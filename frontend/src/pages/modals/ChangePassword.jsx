import React, { useState } from 'react';
import './modalStyles/ChangePassword.css';

const ChangePassword = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Toggle password visibility
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirmation don't match!");
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Current Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                    />

                    <label>New Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                    />

                    <label>Confirm New Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <div className="show-password-toggle">
                        <label htmlFor="showPassword">Show Password</label>
                        <input
                            type="checkbox"
                            id="showPassword"
                            checked={showPassword}
                            onChange={() => setShowPassword(prev => !prev)}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
