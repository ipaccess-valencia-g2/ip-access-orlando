// Modal.jsx
import React from 'react';
import '../compStyles/Modal.css';

const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
