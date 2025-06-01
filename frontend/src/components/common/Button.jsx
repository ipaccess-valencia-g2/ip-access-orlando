// Button.jsx
import React from 'react';

export const Button = ({ label, onClick, style }) => {
    return (
        <button onClick={onClick} style={{ padding: '10px 20px', fontSize: '16px', ...style }}>
            {label}
        </button>
    );
};

export const ButtonRadio = ({ label, name, value, checked, onChange }) => {
    return (
        <label style={{ display: 'block', marginBottom: '8px' }}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                style={{ marginRight: '8px' }}
            />
            {label}
        </label>
    );
};

export const ButtonToggle = ({ isOn, onToggle, style }) => {
    return (
        <button
            onClick={onToggle}
            style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: isOn ? '#00afaf' : '#1a1a1a',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                ...style,
            }}
        >
            {isOn ? 'ON' : 'OFF'}
        </button>
    );
};

