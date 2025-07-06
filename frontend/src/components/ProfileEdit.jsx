import React, { useState } from 'react';
import './componentStyles/ProfileEdit.css';

const ProfileEdit = ({ user, onClose, onSave }) => {
    // Local state initialized with user's current info
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Submit updated profile data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/user/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to update profile');

            const result = await response.json();

            // Notify parent component of the update
            onSave(result);
            onClose();
        } catch (error) {
            console.error('Profile update error:', error);
        }
    };

    return (
        <div className="panel-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Input field for first name */}
                <label>First Name:</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} required/>

                {/* Input field for email */}
                <label>Email:</label>
                <input name="email" value={formData.email} onChange={handleChange} required/>

                {/* Input field for phone number */}
                <label>Phone:</label>
                <input name="phone" value={formData.phone} onChange={handleChange} required/>

                {/* Input field for address */}
                <label>Address:</label>
                <input name="address" value={formData.address} onChange={handleChange} required/>

                {/* Modal action buttons: Save submits form, Cancel closes modal */}
                <div className="modal-actions">
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
