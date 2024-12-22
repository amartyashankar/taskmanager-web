import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import UserFeed from '../components/UserFeed';
import { GET_USERS } from '../gql/query';

const Users = () => {
  useEffect(() => {
    document.title = 'Users';
  });

  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data.users.length !== 0) {
    return <UserFeed users={data.users} />;
  } else {
    return <p>No users found</p>;
  }
};

export default Users;
