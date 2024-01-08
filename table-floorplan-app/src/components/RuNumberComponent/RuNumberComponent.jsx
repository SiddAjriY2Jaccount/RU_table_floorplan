import React, { useState } from 'react';
import './RuNumberComponent.css';

const RuNumberComponent = ({ gridNumber, index, gridSize }) => {

  const computeRuNumber = () => {
    return index + ((gridNumber - 1) * gridSize);
  }

  return (
    <div
      className="RuNumberComponent"
    >
        {computeRuNumber()}
    </div>
  );
};

export default RuNumberComponent;