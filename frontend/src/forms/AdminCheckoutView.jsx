import React, { useState } from 'react';
import '../pages/styles/AdminPage.css';
import '../components/common/Button.jsx';
import '../components/common/Field.jsx';
import '../components/common/Picker.jsx';
import {Field, FieldNumber, PickerDate, Button} from "../components/common/index.js";
const AdminCheckoutView = () => {
    const [deviceID, setDeviceID] = useState('');
    const [userID, setUserID] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [reason, setReason] = useState('');
    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="admin-manual-checkout-view">
            <h2>Manual Checkout</h2>
            <form onSubmit={handleSubmit}>
                <div style={{display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-end'}}>
                    <FieldNumber
                        label="User ID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        min={1}
                        placeholder="Enter User ID"
                    />
                    <FieldNumber
                        label="Device ID"
                        value={deviceID}
                        onChange={(e) => setDeviceID(e.target.value)}
                        min={1}
                        placeholder="Enter Device ID"
                    />
                    <PickerDate
                        label="Return Date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={today}
                    />
                    <Field
                        label="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason for checkout"
                    />
                    <div style={{marginBottom: '16px'}}>
                        <Button
                            type="submit"
                            label="Submit"
                            style={{backgroundColor: '#007bff', color: '#fff', height: '40px'}}
                        />
                    </div>
                </div>
            </form>

        </div>
    );
};

export default AdminCheckoutView;
