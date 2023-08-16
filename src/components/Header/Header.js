import React from 'react';
import './Header.css';
import LogoMain from '../LogoMain/LogoMain';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {
  const headerClass = (`header ${loggedIn ? 'header_movie' : 'header_main'}`);

  return (
    <header className={headerClass}>
      <LogoMain />
      <Navigation loggedIn={loggedIn} />
    </header>
  );
}

export default Header;
