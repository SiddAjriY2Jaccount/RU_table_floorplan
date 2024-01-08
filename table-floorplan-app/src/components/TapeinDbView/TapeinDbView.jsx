import React, { useState, useEffect } from 'react';
import LeftGrid from '../LeftGrid/LeftGrid.jsx';
import RightGrid from '../RightGrid/RightGrid.jsx';
import { generateColorMap, generateCompletedFloorplan } from '../../res/generate_floorplan_from_json.js';
import jsonData from '../../res/dataset'; 
import './TapeinDbView.css';


const TapeinDbView = () => {
    
    const [colorMap, setColorMap] = useState(new Map());
    const [highlightedValues, setHighlightedValues] = useState(new Set());
    const [floorplan, setFloorplan] = useState([]);

    const updateHighlightedValue = (value) => {
        setHighlightedValues(prev => {
          const newHighlighted = new Set(prev);
          if (newHighlighted.has(value)) {
            newHighlighted.delete(value);
          } else {
            newHighlighted.add(value);
          }
          return newHighlighted;
        });
      };

    useEffect(() => {
        const map = generateColorMap(jsonData);
        console.log(map);
        setColorMap(map);
    }, []);

    useEffect(() => {
        const matrix = generateCompletedFloorplan(jsonData);
        console.log(matrix);
        setFloorplan(matrix)
        }, []);

    return (
    <table className="Grid" border="0" cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td className="Headings" colspan="11"> Tape-in DB View </td>
        </tr>

        <tr>
          <td className="Headings"> Grid </td>
          <td className="Headings"> Diode </td>
          <td className="Headings"> Unmask </td>
          <td className="Headings"> RU# </td>
          <td className="Headings" colspan="3"> Seat UUID </td>
          <td className="Headings"> RU# </td>
          <td className="Headings"> Unmask </td>
          <td className="Headings"> Diode </td>
          <td className="Headings"> Grid </td>
        </tr>

        <tr>
          {/* -- GRID NUMBER 1 -- */}
          <LeftGrid floorplan={floorplan} colorMap={colorMap} updateHighlightedValue={updateHighlightedValue} highlightedValues={highlightedValues} gridNumber={1} />
          
          {/* -- EMPTY DIVIDER -- */}
          <td>     </td>
          
          {/* -- GRID NUMBER 2 -- */}
          <RightGrid floorplan={floorplan} colorMap={colorMap} updateHighlightedValue={updateHighlightedValue} highlightedValues={highlightedValues} gridNumber={2} />
          
        </tr>

        {/* -- MIDHALF -- */}
        <tr>
          <td colspan="11" border="5px">
            <b>MIDHALF</b>
          </td>
        </tr>

        <tr>
          {/* -- GRID NUMBER 3 -- */}
          <LeftGrid floorplan={floorplan} colorMap={colorMap} updateHighlightedValue={updateHighlightedValue} highlightedValues={highlightedValues} gridNumber={3} />
          
          {/* -- EMPTY DIVIDER -- */}
          <td>     </td>
          
          {/* -- GRID NUMBER 4 -- */}
          <RightGrid floorplan={floorplan} colorMap={colorMap} updateHighlightedValue={updateHighlightedValue} highlightedValues={highlightedValues} gridNumber={4} />
          
        </tr>

        {/* -- MISC BLOCK -- */}
        <tr>
          <td></td>
          <td colspan="8" border="5px">
            <b>MISC BLOCK</b>
          </td>
          <td></td>
        </tr>

      </tbody>
    </table>
  );
};

export default TapeinDbView;