import React, { useState } from 'react';
import './DiodeButton.css';

const DiodeButton = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleColor = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={toggleColor}
      className={`DiodeButton ${isActive ? 'active' : ''}`}
    >
        Diode
    </div>
  );
};

export default DiodeButton;