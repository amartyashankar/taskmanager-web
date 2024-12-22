import React from 'react';
import styled from 'styled-components';
import User from './User';
import { Link } from 'react-router-dom';

// Styled component for user wrapper
const UserWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 2em;
  padding-bottom: 2em;
  border-bottom: 1px solid #f5f4f0;
`;

const UserFeed = ({ users }) => {
  return (
    <div className="user-feed">
      {users.map((user) => (
        <UserWrapper key={user.id}>
          <User user={user} />
          <Link to={`/users/${user.id}`}>All Tasks</Link>
        </UserWrapper>
      ))}
    </div>
  );
};

export default UserFeed;
