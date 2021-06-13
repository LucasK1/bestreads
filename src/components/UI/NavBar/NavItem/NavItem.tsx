import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavItem.module.scss";

interface Props {
  path: string;
  title: string;
}

const NavItem: FC<Props> = ({ path, title }) => {
  return (
    <li className={classes.NavItem}>
      {
        <NavLink
          to={path}
          exact
          className={classes.NavLink}
          activeClassName={classes.isActive}
        >
          {title}
        </NavLink>
      }
    </li>
  );
};

export default NavItem;
