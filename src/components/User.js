import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import DeleteUser from './DeleteUser'; // Import the DeleteUser component
import { GET_ME } from '../gql/query';

// Keep user card from extending wider than 800px
const StyledUser = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 1em 0;
  border-bottom: 1px solid #f5f4f0;
`;

// Style the user meta data
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: top;
  }
`;

// Add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`;

// Align 'Tasks Created' and actions to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`;

const User = ({ user }) => {
  const { loading, error, data } = useQuery(GET_ME);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;

  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;

  return (
    <StyledUser>
      <MetaData>
        <MetaInfo>
          <img
            src={user.avatar}
            alt={`${user.username}'s avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <strong>{user.username}</strong> <br />
        </MetaInfo>
        <UserActions>
          <em>Tasks Created:</em> {user.tasks.length} <br />
          {data.me.username === 'admin' && (
            <React.Fragment>
              <DeleteUser userId={user.id} />
            </React.Fragment>
          )}
        </UserActions>
      </MetaData>
    </StyledUser>
  );
};

export default User;
