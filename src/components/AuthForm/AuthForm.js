import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as actions from 'store/actions';

import classes from './AuthForm.module.scss';
import { connect } from 'react-redux';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters'),
});

const AuthForm = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(true);

  const submitHandler = (email, password, isSignup) => {
    onAuth(email, password, isSignup);
  };

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
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(null, mapDispatchToProps)(AuthForm);
