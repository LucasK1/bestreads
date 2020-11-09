import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavItem.module.scss'

const NavItem = (props) => {
  return (
    <li className={classes.NavItem}>
      <Link to={props.path} className={classes.NavLink}>{props.title}</Link>
    </li>
  );
};

export default NavItem;
