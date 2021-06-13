import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";

import classes from "./DropdownItem.module.scss";

const DropdownItem: FC<{ clicked: MouseEventHandler }> = ({
  clicked,
  children,
}) => {
  return (
    <Link to="" className={classes.dropdownItem} onClick={clicked}>
      {children}
    </Link>
  );
};

export default DropdownItem;
