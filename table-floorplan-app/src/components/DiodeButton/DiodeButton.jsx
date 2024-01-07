import React, { useState } from 'react';
import './DiodeButton.css';

const DiodeButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleColor = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={toggleColor}
      className={`DiodeButton ${isActive ? 'active' : ''}`}
    >
        Diode
    </button>
  );
};

export default DiodeButton;