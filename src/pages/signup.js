import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IS_LOGGED_IN } from '../gql/query';
import UserForm from '../components/UserForm';
import { SIGNUP_USER } from '../gql/mutation';

const SignUp = () => {
  const navigate = useNavigate(); // For navigation in React Router v6
  const client = useApolloClient();

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      // Store the token in localStorage
      localStorage.setItem('token', data.signUp);

      // Update the local cache
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });

      // Redirect the user to the homepage
      navigate('/');
    }
  });

  useEffect(() => {
    // Update the document title
    document.title = 'Sign Up';
  }, []);

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup" />
      {/* Display loading or error messages */}
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
