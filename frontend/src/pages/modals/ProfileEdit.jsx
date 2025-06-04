import React, { useState } from 'react';
import './modalStyles/ProfileEdit.css';

const ProfileEdit = ({ user, onClose, onSave }) => {

    // useState to track the form fields; pre-filled with existing user data or empty strings
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
    });

    // Handles input changes by updating the corresponding field in formData
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Called when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    {/* Input field for first name */}
                    <label>First Name:</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} />

                    {/* Input field for email */}
                    <label>Email:</label>
                    <input name="email" value={formData.email} onChange={handleChange} />

                    {/* Input field for phone number */}
                    <label>Phone:</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} />

                    {/* Input field for address */}
                    <label>Address:</label>
                    <input name="address" value={formData.address} onChange={handleChange} />

                    {/* Modal action buttons: Save submits form, Cancel closes modal */}
                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEdit;
