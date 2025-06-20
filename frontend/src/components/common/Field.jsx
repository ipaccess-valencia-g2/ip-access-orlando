import React from 'react';

export const Field = ({ label, value, onChange, placeholder, type = 'text', style }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '500px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    ...style,
                }}
            />
        </div>
    );
};

export const FieldLarge = ({ label, value, onChange, placeholder, rows = 4, style }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
            <textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '500px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    resize: 'vertical',
                    ...style,
                }}
            />
        </div>
    );
};

export const FieldNumber = ({ label, value, onChange, min, max, step = 1, placeholder, style }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
            <input
                type="number"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                placeholder={placeholder}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '200px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    ...style,
                }}
            />
        </div>
    );
};