import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as actions from 'store/actions';
import { RootState } from 'types/StateTypes';

import Spinner from 'components/UI/Spinner';

import classes from './AuthForm.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters'),
});

const AuthForm: FC = () => {
  const [isSignup, setIsSignup] = useState(true);

  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);

  const dispatch = useDispatch();

  const submitHandler = (
    email: string,
    password: string,
    isSignup: boolean
  ) => {
    dispatch(actions.auth(email, password, isSignup));
  };

  let errorMessage = null;
  if (error) {
    errorMessage = error.message.toLowerCase().split('_');
    console.log(errorMessage);
    errorMessage = errorMessage.join(' ');
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={({ email, password }) =>
          submitHandler(email, password, isSignup)
        }>
        {() => (
          <Form className={classes.form}>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage
              component="span"
              name="email"
              className={classes.errorMessage}
            />
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage
              component="span"
              name="password"
              className={classes.errorMessage}
            />
            <button type="submit">{isSignup ? 'Sign up' : 'Sign in'}</button>
          </Form>
        )}
      </Formik>
      <span>
        {isSignup ? (
          <>
            Already Signed up?
            <button onClick={() => setIsSignup(false)}>Sign in</button>
          </>
        ) : (
          <>
            Don't have an account?
            <button onClick={() => setIsSignup(true)}>Sign up</button>
          </>
        )}
      </span>
      {error && <p>{errorMessage}</p>}
      {loading && <Spinner />}
    </>
  );
};

export default AuthForm;
