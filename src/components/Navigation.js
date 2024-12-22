import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { GET_ME } from '../gql/query';

// Local cache query to check if the user is logged in
const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

// Styled components
const Nav = styled.nav.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})`
  padding: 1em;
  background: #f5f4f0;

  @media (max-width: 700px) {
    position: fixed;
    width: ${({ isCollapsed }) => (isCollapsed ? '90px' : '180px')};
    height: 100%;
    top: 64px;
    left: 0;
    overflow-y: auto;
    transition: width 0.3s ease;
  }

  @media (min-width: 700px) {
    position: fixed;
    width: ${({ isCollapsed }) => (isCollapsed ? '90px' : '220px')};
    height: calc(100% - 64px);
    top: 64px;
    left: 0;
    overflow-y: auto;
    transition: width 0.3s ease;
  }
`;

const MenuButton = styled.button`
  background: #f5f4f0;
  border: none;
  cursor: pointer;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all 0.3s ease;
  border-radius: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #333;
  }
`;

const NavList = styled.ul.withConfig({
  shouldForwardProp: (prop) => prop !== 'isCollapsed',
})`
  margin: 0;
  padding: 0;
  list-style: none;
  line-height: 2;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    color: #333;
    padding: 1em;
    width: 100%;
    background: #f5f4f0;
    border-radius: 8px;
    transition: background 0.3s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }

  a span {
    margin-right: ${({ isCollapsed }) => (isCollapsed ? '0' : '1em')};
  }
`;

const Navigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if the user is logged in using the IS_LOGGED_IN query
  const { data: loggedInData } = useQuery(IS_LOGGED_IN);

  // Execute the GET_ME query only if the user is logged in
  const { loading, error, data } = useQuery(GET_ME, {
    skip: !loggedInData?.isLoggedIn,
  });

  if (loading) return null;
  if (error && loggedInData?.isLoggedIn) {
    console.error(error);
    return <p>Error loading user data. Please try again later.</p>;
  }

  const isLoggedIn = loggedInData?.isLoggedIn;
  const isAdmin = data?.me?.username === 'admin';

  return (
    <Nav isCollapsed={isCollapsed}>
      <MenuButton onClick={() => setIsCollapsed(!isCollapsed)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </MenuButton>
      <NavList isCollapsed={isCollapsed}>
        <li>
          <Link to="/">
            <span aria-hidden="true" role="img">
              🏠
            </span>
            {!isCollapsed && 'Home'}
          </Link>
        </li>
        <li>
          <Link to="/mytasks">
            <span aria-hidden="true" role="img">
              📓
            </span>
            {!isCollapsed && 'My Tasks'}
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <span aria-hidden="true" role="img">
              🌟
            </span>
            {!isCollapsed && 'Favorites'}
          </Link>
        </li>
        <li>
          <Link to="/new">
            <span aria-hidden="true" role="img">
              ➕
            </span>
            {!isCollapsed && 'New'}
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/profile">
              <span aria-hidden="true" role="img">
                👤
              </span>
              {!isCollapsed && 'Profile'}
            </Link>
          </li>
        )}
        {isLoggedIn && isAdmin && (
          <li>
            <Link to="/users">
              <span aria-hidden="true" role="img">
                👥
              </span>
              {!isCollapsed && 'Users'}
            </Link>
          </li>
        )}
      </NavList>
    </Nav>
  );
};

export default Navigation;
