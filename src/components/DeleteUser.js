import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink'; // Reuse the ButtonAsLink component
import { DELETE_USER } from '../gql/mutation';
import { GET_USERS } from '../gql/query';

const DeleteUser = ({ userId }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [deleteUser] = useMutation(DELETE_USER, {
    variables: {
      id: userId,
    },
    // Refetch the user list query to update the cache
    refetchQueries: [{ query: GET_USERS }],
    onCompleted: () => {
      // Redirect the user to the "users" page or any other admin dashboard
      alert('User deleted successfully');
      navigate('/users');
    },
    onError: (error) => {
      alert(`Error deleting user: ${error.message}`);
    },
  });

  return <ButtonAsLink onClick={deleteUser}>Delete User</ButtonAsLink>;
};

export default DeleteUser;
