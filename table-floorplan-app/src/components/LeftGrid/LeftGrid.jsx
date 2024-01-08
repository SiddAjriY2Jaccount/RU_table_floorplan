import React from 'react';
import DiodeButton from '../DiodeButton/DiodeButton.jsx';
import UnmaskButton from '../UnmaskButton/UnmaskButton.jsx';
import RuNumberComponent from '../RuNumberComponent/RuNumberComponent.jsx';
import ProductComponent from '../Product/ProductComponent.jsx';
import '../TapeinDbView/TapeinDbView.css';

const LeftGrid = ({ floorplan, colorMap, updateHighlightedValue, highlightedValues, gridNumber }) => {

    return <>
    <td style={{ backgroundColor: `hsl(${(gridNumber * 100) % 360}, 50%, 75%)` }}> {gridNumber} </td>
          
          <td className="InnerCell"> 
          {floorplan.length > 0 && floorplan[gridNumber - 1].map((value, index) => (
          <tr key={index}>
            <td className="InnerCellRow"><DiodeButton /></td>
          </tr>
        ))}
          </td>
          
          <td className="InnerCell">
          {floorplan.length > 0 && floorplan[gridNumber - 1].map((value, index) => (
          <tr key={index}>
            <td className="InnerCellRow"><UnmaskButton onClick={() => updateHighlightedValue(value)} isHighlighted={highlightedValues.has(value)} /></td>
          </tr>
        ))}
          </td>
          
          <td className="InnerCell">
          {floorplan.length > 0 && floorplan[gridNumber - 1].map((value, index) => (
          <tr key={index}>
            <td className="InnerCellRow"><RuNumberComponent gridNumber={gridNumber} index={index} gridSize={floorplan[gridNumber - 1].length} /></td>
          </tr>
        ))}
          </td>
          
          <td className="InnerCell"> 
          {floorplan.length > 0 && floorplan[gridNumber - 1].map((value, index) => (
          <tr key={index}>
            <td className="InnerCellRow"><ProductComponent gridNumber={gridNumber} index={index} floorplan={floorplan} colorMap={colorMap} /></td>
          </tr>
        ))} </td>
    </>
}

export default LeftGrid;