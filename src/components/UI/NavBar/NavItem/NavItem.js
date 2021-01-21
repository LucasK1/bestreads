import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.scss';

const NavItem = ({ path, title }) => {
  return (
    <li className={classes.NavItem}>
      {
        <NavLink
          to={path}
          exact
          className={classes.NavLink}
          activeClassName={classes.isActive}>
          {title}
        </NavLink>
      }
    </li>
  );
};

export default NavItem;
