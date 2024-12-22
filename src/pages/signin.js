import React, { useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { IS_LOGGED_IN } from '../gql/query';
import UserForm from '../components/UserForm';
import { SIGNIN_USER } from '../gql/mutation';

const SignIn = () => {
  useEffect(() => {
    // Update the document title
    document.title = 'Sign In';
  }, []);

  const client = useApolloClient();
  const navigate = useNavigate();

  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      // Store the token
      localStorage.setItem('token', data.signIn);

      // Update the local cache with the new logged-in status
      client.cache.writeQuery({
        query: IS_LOGGED_IN,
        data: { isLoggedIn: true },
      });

      // Redirect the user to the homepage
      navigate('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn" />
      {/* Display a loading message if the data is loading */}
      {loading && <p>Loading...</p>}
      {/* Display an error message if there is an error */}
      {error && <p>Error signing in!</p>}
    </React.Fragment>
  );
};

export default SignIn;
