import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import DeleteTask from './DeleteTask';
import FavoriteTask from './FavoriteTask';
import { GET_ME } from '../gql/query';

const TaskUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteTask
        me={data.me}
        taskId={props.task.id}
        favoriteCount={props.task.favoriteCount}
      />
      <br />
      {(data.me.id === props.task.author.id || data.me.username === 'admin') && (
        <React.Fragment>
          <Link to={`/edit/${props.task.id}`}>Edit</Link> <br />
          <DeleteTask taskId={props.task.id} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default TaskUser;
