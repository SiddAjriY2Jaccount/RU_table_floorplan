import React from 'react';
import './UnmaskButton.css';

const UnmaskButton = ({ rowIndex }) => {
  const handleUnmaskClick = () => {
    // Placeholder for unmask button's onClick event handler logic
    console.log(`Unmask row ${rowIndex}`);
  };

  return (
    <button
      onClick={handleUnmaskClick}
      className="UnmaskButton"
    >
      Unmask
    </button>
  );
};

export default UnmaskButton;
