import React from 'react';

const MyModal = ({ visible, onClose, selectedDate }) => {
  // ... your modal content and logic here
  // You can use a library like React Modal to handle the modal visuals
  return (
    <div style={{ 
        display: visible ? 'flex' : 'none', 
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        position: 'fixed', 
        top: 150, 
        left: 550, 
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white', 
        padding: 20, 
        border: '1px solid black'}}>
      {/* Modal content */}
      <p>Selected date: {selectedDate.format('YYYY-MM-DD') || 'No date selected'}</p>
      {/* Edit and cancel buttons */}
      <button onClick={onClose}>Cancel</button>
      <button onClick={ onClose 
      }>Edit</button>
    </div>
  );
};

export default MyModal;