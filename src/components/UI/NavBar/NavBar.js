import React from 'react';

import NavItem from './NavItem/NavItem';

import classes from './NavBar.module.scss';

const NavBar = () => {
  return (
    <nav className={classes.NavBar}>
      <ul className={classes.NavItems}>
        <NavItem path="/" title="Bestreads" />
        <NavItem path="/shelf" title="Shelf" />
      </ul>
    </nav>
  );
};

export default NavBar;
