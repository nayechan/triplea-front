import React, { useState } from 'react';
import 'styles/Modal/Modal.css'; // Import your CSS file for styling the modal

const Modal = ({ isVisible, onClose, width, height, children }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{ width: width, height: height }}>
        <button className="close-button" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
