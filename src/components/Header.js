import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.svg';
import { useQuery, useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';
import { IS_LOGGED_IN } from '../gql/query';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = () => {
  const navigate = useNavigate(); // React Router v6 navigation hook
  const client = useApolloClient(); // Apollo Client instance
  const { data } = useQuery(IS_LOGGED_IN);

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Clear Apollo cache and reset state
    client.clearStore();
    // Update local state to reflect logged out status
    client.cache.writeQuery({
      query: IS_LOGGED_IN,
      data: { isLoggedIn: false },
    });
    // Redirect to the homepage
    navigate('/signin');
    window.location.reload();
  };

  return (
    <HeaderBar>
      <img src={logo} alt="TaskManager Logo" height="40" />
      <LogoText>TaskManager</LogoText>
      <UserState>
        {data?.isLoggedIn ? (
          <ButtonAsLink onClick={handleLogout}>Logout</ButtonAsLink>
        ) : (
          <p>
            <Link to="/signin">SignIn</Link> | <Link to="/signup">SignUp</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default Header;
