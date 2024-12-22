import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import TaskFeed from '../components/TaskFeed';
import { GET_MY_TASKS } from '../gql/query';

const MyTasks = () => {
  useEffect(() => {
    // update the document title
    document.title = 'My Tasks';
  });

  const { loading, error, data } = useQuery(GET_MY_TASKS);

  // if the data is loading, our app will display a loading message
  if (loading) return 'Loading...';
  // if there is an error fetching the data, display an error message
  if (error) return `Error! ${error.message}`;
  // if the query is successful and there are notes, return the feed of notes
  // else if the query is successful and there aren't notes, display a message
  if (data.me.tasks.length !== 0) {
    return <TaskFeed tasks={data.me.tasks} />;
  } else {
    return <p>No notes yet</p>;
  }
};

export default MyTasks;
