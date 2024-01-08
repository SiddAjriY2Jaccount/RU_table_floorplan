import React from 'react';
import './UnmaskButton.css';

const UnmaskButton = ({ onClick, isHighlighted }) => {
    const buttonStyle = {
        backgroundColor: isHighlighted ? 'yellow' : '',
        };
    
    return (
    <div
    onClick={onClick}
    style={buttonStyle}
    className="UnmaskButton"
    >
      Unmask
    </div>
  );
};

export default UnmaskButton;
