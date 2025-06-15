import React, { useState } from 'react';
import './formStyles/ProfileEdit.css';

const ProfileEdit = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            for (const [column, value] of Object.entries(formData)) {
                if (user[column] !== value) {
                    const response = await fetch(
                        `http://18.223.161.174:3307/users/${user.userID}/${column}/${encodeURIComponent(value)}`,
                        {
                            method: 'PUT',
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`Failed to update ${column}`);
                    }
                }
            }

            onSave();
            onClose();
        } catch (error) {
            console.error('Profile update error:', error);
        }
    };

    return (
        <div className="panel-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={user.username || 'Username not set'}
                    required
                />

                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={user.email || 'Email not set'}
                    required
                />

                <label>Phone:</label>
                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={user.phone || 'Phone not set'}
                    required
                />

                <label>Address:</label>
                <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={user.address || 'Address not set'}
                    required
                />

                <div className="action-btn ">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
