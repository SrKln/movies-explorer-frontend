import React from 'react';
import './LogoMain.css';
import { Link } from 'react-router-dom';


function LogoMain() {
  return (
    <Link to="/" className=" link">{
      <div className="logomain" aria-label='Логотип' ></div>
    }</Link >
  )
}

export default LogoMain;
