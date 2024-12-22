import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';  // Import useParams hook

// Import the Note component
import Task from '../components/Task';
import { GET_TASK } from '../gql/query';

const TaskPage = () => {
  // Get the id from the URL using useParams
  const { id } = useParams();  // useParams hook for React Router v6

  // Query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_TASK, { variables: { id } });

  // If the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // If there is an error fetching the data, display an error message
  if (error) return <p>Error! Note not found</p>;

  // If the data is successful, display the data in our UI
  return <Task task={data.task} />;
};

export default TaskPage;
