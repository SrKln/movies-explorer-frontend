import React from 'react';
import './Switch.css';

function Switch({ isToggled, onToggle }) {

  return (
    <label className='switch' >
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className='switch__slider' ></span>
    </label >
  )
}

export default Switch;
