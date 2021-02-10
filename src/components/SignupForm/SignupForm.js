import React from 'react';
import { useFormik } from 'formik';

import classes from './SignupForm.module.scss';

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => alert(JSON.stringify(values, null, 2)),
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </form>
    </div>
  );
};

export default SignupForm;
