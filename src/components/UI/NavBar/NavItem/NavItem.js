import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavItem.module.scss';

const NavItem = ({ path, title, dropdown, children }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className={classes.NavItem}>
      {dropdown ? (
        <>
          <span className={classes.NavLink} onClick={() => setOpen(!open)}>
            {title}
          </span>
        </>
      ) : (
        <Link to={path} className={`${classes.NavLink} ${classes.isActive}`}>
          {title}
        </Link>
      )}
      {open && children}
    </li>
  );
};

export default NavItem;
