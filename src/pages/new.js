import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import { NEW_TASK } from '../gql/mutation';
import { GET_MY_TASKS, GET_TASKS } from '../gql/query';

const NewTask = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'New Task';
  }, []);

  const [newTask, { loading, error }] = useMutation(NEW_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }, { query: GET_TASKS }],
    onCompleted: (data) => {
      navigate(`/task/${data.newTask.id}`);
    },
  });

  return (
    <React.Fragment>
      {loading && <p>Saving your task...</p>}
      {error && <p>Error saving the task: {error.message}</p>}

      {/* Pass type="new" */}
      <TaskForm type="new" action={newTask} />
    </React.Fragment>
  );
};

export default NewTask;
