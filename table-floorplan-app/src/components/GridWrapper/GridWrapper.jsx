import React from 'react';
import Grid from '../Grid/Grid.jsx';
import './GridWrapper.css';

const GridWrapper = () => {
  return (
    <div className="GridWrapper">
      <div className="GridContainer"><Grid gridNumber={1} /></div>
      <div className="GridContainer"><Grid gridNumber={2} /></div>
      <div className="GridContainer"><Grid gridNumber={3} /></div>
      <div className="GridContainer"><Grid gridNumber={4} /></div>
    </div>
  );
};

export default GridWrapper;