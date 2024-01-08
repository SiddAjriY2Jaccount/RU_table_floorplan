import React, { useState, useEffect } from 'react';
import DiodeButton from '../DiodeButton/DiodeButton.jsx';
import UnmaskButton from '../UnmaskButton/UnmaskButton.jsx';
import { generateCompletedFloorplan } from '../../res/generate_floorplan_from_json.js';
import jsonData from '../../res/dataset'; 
import './Grid.css';

const Grid = ({ gridNumber, colorMap, highlightedValues, updateHighlightedValue }) => {
//   const rows = new Array(20).fill(null);
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    const generatedMatrix = generateCompletedFloorplan(jsonData);
    if (gridNumber > 0 && gridNumber <= generatedMatrix.length) {
        setGrid(generatedMatrix[gridNumber - 1]);
    }
  }, [gridNumber]);

  const isEven = gridNumber % 2 === 0;

  const computeGridIndex = (index) => {
    return index + ((gridNumber - 1) * 20) // 20 is the size of the grid
  }

  return (
    <table className="Grid">
      <tbody>
        <tr>
          <td> 1 </td>
          <td>
          {grid.map((value, index) => (
          <tr key={index}>
            {isEven ? <td style={{ backgroundColor: colorMap.get(value) }}>{value}</td> : <td><DiodeButton /></td>}
            {isEven ? <td>{computeGridIndex(index)}</td> : <td><UnmaskButton rowIndex={computeGridIndex(index)} onClick={() => updateHighlightedValue(value)} isHighlighted={highlightedValues.has(value)} /></td>}
            {isEven ? <td><UnmaskButton rowIndex={computeGridIndex(index)} onClick={() => updateHighlightedValue(value)} isHighlighted={highlightedValues.has(value)} /></td> : <td>{computeGridIndex(index)}</td>}
            {isEven ? <td><DiodeButton /></td> : <td style={{ backgroundColor: colorMap.get(value) }}>{value}</td>}
          </tr>
        ))}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Grid;
