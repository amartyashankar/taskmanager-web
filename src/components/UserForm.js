import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Form = styled.form`
  label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5em;
    color: #333;
  }

  input {
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  input:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 3px rgba(0, 119, 204, 0.3);
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-bottom: 1em;
`;

const UserForm = ({ formType, action, error }) => {
  // Manage form state
  const [values, setValues] = useState({
    email: '',
    password: '',
    username: formType === 'signup' ? '' : undefined, // Include username only for sign-up
  });

  // Handle input changes
  const onChange = event => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Submit form
  const onSubmit = event => {
    event.preventDefault();
    action({
      variables: {
        ...values,
      },
    });
  };

  return (
    <Wrapper>
      {/* Form Header */}
      <h2>{formType === 'signup' ? 'Create an Account' : 'Sign In'}</h2>
      {/* Display Error Message */}
      {error && <Error>{error.message || 'An error occurred. Please try again.'}</Error>}
      <Form onSubmit={onSubmit}>
        {/* Username Field for Sign-Up */}
        {formType === 'signup' && (
          <>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={values.username || ''}
              placeholder="Enter your username"
              onChange={onChange}
              required
            />
          </>
        )}
        {/* Email Field */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          placeholder="Enter your email"
          onChange={onChange}
          required
        />
        {/* Password Field */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          placeholder="Enter your password"
          onChange={onChange}
          required
        />
        {/* Submit Button */}
        <Button type="submit">{formType === 'signup' ? 'Sign Up' : 'Sign In'}</Button>
      </Form>
    </Wrapper>
  );
};

export default UserForm;
