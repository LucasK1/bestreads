import React, { useState } from 'react';

import NavItem from './NavItem/NavItem';
import { ReactComponent as CaretIcon } from '../../../assets/caret.svg';

import classes from './NavBar.module.scss';
import DropdownMenu from '../../DropdownMenu/DropdownMenu';

const NavBar = () => {
  useState();

  return (
    <nav className={classes.NavBar}>
      <div className={classes.Container}>
        <NavItem path="/" title="Bestreads" />
        <ul className={classes.NavItems}>
          <NavItem path="/shelf" title="Shelf" />
          <NavItem
            dropdown
            title={
              <CaretIcon
                style={{ fill: '#544', width: '20px', height: '20px' }}
              />
            }>
            <DropdownMenu />
          </NavItem>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
