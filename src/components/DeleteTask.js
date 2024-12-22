import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // useNavigate hook replaces withRouter

import ButtonAsLink from './ButtonAsLink';
import { DELETE_TASK } from '../gql/mutation';
import { GET_MY_TASKS, GET_TASKS } from '../gql/query';

const DeleteTask = ({ taskId }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [deleteTask] = useMutation(DELETE_TASK, {
    variables: {
      id: taskId,
    },
    // Refetch the note list queries to update the cache
    refetchQueries: [{ query: GET_MY_TASKS }, { query: GET_TASKS }],
    onCompleted: () => {
      // Redirect the user to the "my notes" page using navigate
      navigate('/mytasks');
    },
  });

  return <ButtonAsLink onClick={deleteTask}>Delete Task</ButtonAsLink>;
};

export default DeleteTask;
