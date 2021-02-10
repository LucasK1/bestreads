import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import classes from './SignupForm.module.scss';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password must be at least 8 characters'),
});

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}>
      {() => (
        <Form className={classes.form}>
          <label htmlFor="email">Email</label>
          <Field name="email" />
          <ErrorMessage component="span" name="email" className={classes.errorMessage}/>
          <label htmlFor="password">Password</label>
          <Field name="password" />
          <ErrorMessage component="span" name="password" className={classes.errorMessage}/>
          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
