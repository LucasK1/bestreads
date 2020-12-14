import React from 'react';
import { Link } from 'react-router-dom';

import classes from './DropdownItem.module.scss';

const DropdownItem = (props) => {
  return (
    <Link
      className={classes.dropdownItem}
      onClick={props.clicked}>
      {props.children}
    </Link>
  );
};

export default DropdownItem;
