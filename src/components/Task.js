import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import TaskUser from './TaskUser';
import { IS_LOGGED_IN } from '../gql/query';

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`;

// Style the note meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// align 'Favorites' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const Task = ({ task }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN);
  
  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  // Check if createdAt is a valid date
  const createdAt = String(new Date(task.createdAt));

  return (
    <StyledNote>
      <MetaData>
        <MetaInfo>
          <img
            src={task.author.avatar}
            alt={`${task.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {task.author.username} <br />
          {createdAt}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <TaskUser task={task} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {task.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown>{task.status}</ReactMarkdown>
    </StyledNote>
  );
};

export default Task;
