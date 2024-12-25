import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom'; // Import useParams hook

// Import the User component
import TaskFeed from '../components/TaskFeed';
import { GET_USER_BY_ID } from '../gql/query'; // Query to fetch a specific user's data

const UserTasks = () => {
  // Get the id from the URL using useParams
  const { id } = useParams(); // useParams hook for React Router v6

  // Query hook, passing the id value as a variable
  const { loading, error, data } = useQuery(GET_USER_BY_ID, { variables: { id } });

  // If the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // If there is an error fetching the data, display an error message
  if (error) return <p>Error! User not found</p>;

  // If the data is successful, display the data in our UI
  if (data.userById.tasks.length !== 0) {
    return <TaskFeed tasks={data.userById.tasks} />;
  } else {
    return <p>No tasks found</p>;
  }
  
};

export default UserTasks;
