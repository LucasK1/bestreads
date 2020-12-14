import React from 'react';

import DropdownItem from './DropdownItem/DropdownItem';

import classes from './DropdownMenu.module.scss';

const DropdownMenu = () => {
  return (
    <div className={classes.dropdownMenu}>
      <DropdownItem>My Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
    </div>
  );
};

export default DropdownMenu;
