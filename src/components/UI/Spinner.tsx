import React, { ReactElement } from 'react';

import classes from './Spinner.module.css';

const Spinner = (): ReactElement => {
  return (
    <div className={classes.ldsCircle}>
      <div></div>
    </div>
  );
};

export default Spinner;
