import React from 'react';

import NavItem from './NavItem/NavItem';
// import { ReactComponent as CaretIcon } from '../../../assets/caret.svg';
// import DropdownMenu from '../../DropdownMenu/DropdownMenu';

import classes from './NavBar.module.scss';

const NavBar = () => {
  


  return (
    <nav className={classes.NavBar}>
      <div className={classes.Container}>
        <NavItem path="/" title="Bestreads" />
        <ul className={classes.NavItems}>
          <NavItem path="/shelf" title="Shelf" />
          <NavItem path="/signup" title="Sign Up" />
          {/* <NavItem
            dropdown
            title={
              <CaretIcon
                style={{ fill: '#544', width: '20px', height: '20px' }}
              />
            }>
            <DropdownMenu />
          </NavItem> */}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
