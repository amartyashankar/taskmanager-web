import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import { GET_TASK, GET_ME } from '../gql/query';
import { EDIT_TASK } from '../gql/mutation';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_TASK, { variables: { id } });
  const { data: userData } = useQuery(GET_ME);

  const [editTask] = useMutation(EDIT_TASK, {
    onCompleted: () => {
      navigate(`/task/${id}`);
    },
  });

  if (loading) return 'Loading...';
  if (error) return <p>Error loading task!</p>;

  if ((userData.me.id !== data.task.author.id) && (userData.me.username !== 'admin')) {
    return <p>You do not have access to edit this task</p>;
  }

  return <TaskForm type="edit" action={editTask} task={data.task} />;
};

export default EditTask;
