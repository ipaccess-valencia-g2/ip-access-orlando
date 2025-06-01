import React from "react";

export const PickerDate = ({ label, value, onChange, min, max, style }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
            <input
                type="date"
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '220px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    ...style,
                }}
            />
        </div>
    );
};

export const PickerDrop = ({ label, options, value, onChange, placeholder, style }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '4px' }}>{label}</label>}
            <select
                value={value}
                onChange={onChange}
                style={{
                    padding: '8px 12px',
                    fontSize: '16px',
                    width: '100%',
                    maxWidth: '220px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    ...style,
                }}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};