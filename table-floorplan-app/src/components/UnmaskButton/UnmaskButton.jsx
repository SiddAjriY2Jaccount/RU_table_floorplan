import React from 'react';
import './UnmaskButton.css';

const UnmaskButton = ({ rowIndex, onClick, isHighlighted }) => {
    const buttonStyle = {
        backgroundColor: isHighlighted ? 'yellow' : '',
        };
    
    return (
    <button
    onClick={onClick}
    style={buttonStyle}
    className="UnmaskButton"
    >
      Unmask
    </button>
  );
};

export default UnmaskButton;
