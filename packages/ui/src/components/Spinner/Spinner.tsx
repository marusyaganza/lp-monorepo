import React from 'react';
import  './Spinner.css';

export const Spinner = () => {
  return (
    <div className='spinnerBox'>
      <p className='altText' role="alert">
        Loading...
      </p>
      <div className='pulseContainer'>
        <div className='pulseBubble pulseBubble1' />
        <div className='pulseBubble pulseBubble2' />
        <div className='pulseBubble pulseBubble3' />
      </div>
    </div>
  );
};
