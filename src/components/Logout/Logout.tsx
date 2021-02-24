import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import * as actions from 'store/actions';

const Logout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.logout());
  }, [dispatch]);

  return <Redirect to="/" />;
};

export default Logout;
