import { FC } from "react";

import classes from "./Spinner.module.css";

const Spinner: FC = () => {
  return (
    <div className={classes.ldsCircle}>
      <div></div>
    </div>
  );
};

export default Spinner;
