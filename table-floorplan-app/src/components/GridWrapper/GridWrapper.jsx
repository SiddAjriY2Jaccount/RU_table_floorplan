import React, { useState, useEffect } from 'react';
import Grid from '../Grid/Grid.jsx';
import { generateColorMap } from '../../res/generate_floorplan_from_json.js';
import jsonData from '../../res/dataset'; 
import './GridWrapper.css';

const GridWrapper = () => {
    
    const [colorMap, setColorMap] = useState(new Map());
    const [highlightedValues, setHighlightedValues] = useState(new Set());

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

    return (
    <div className="GridWrapper">
      <div className="GridContainer"><Grid gridNumber={1} colorMap={colorMap} highlightedValues={highlightedValues} updateHighlightedValue={updateHighlightedValue} /></div>
      <div className="GridContainer"><Grid gridNumber={2} colorMap={colorMap} highlightedValues={highlightedValues} updateHighlightedValue={updateHighlightedValue} /></div>
      <div className="GridContainer"><Grid gridNumber={3} colorMap={colorMap} highlightedValues={highlightedValues} updateHighlightedValue={updateHighlightedValue} /></div>
      <div className="GridContainer"><Grid gridNumber={4} colorMap={colorMap} highlightedValues={highlightedValues} updateHighlightedValue={updateHighlightedValue} /></div>
    </div>
  );
};

export default GridWrapper;