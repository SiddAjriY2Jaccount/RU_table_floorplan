import React from 'react';
import './ProductComponent.css';

const ProductComponent = ({ gridNumber, index, floorplan, colorMap }) => {

  const getProductNameFromFloorplan = () => {
    return floorplan[gridNumber - 1][index]
  }

  return (
    <div
      className="ProductComponent"
      style={{ backgroundColor: colorMap.get(getProductNameFromFloorplan()) }}
    >
        {getProductNameFromFloorplan()}
    </div>
  );
};

export default ProductComponent;