import React from 'react';

import classes from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={classes.ldsCircle}>
      <div></div>
    </div>
  );
};

export default Spinner;
