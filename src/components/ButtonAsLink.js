import styled from 'styled-components';

const ButtonAsLink = styled.button`
  display: inline-block; /* Matches the global link */
  padding: 0.5em 1em; /* Matches global link padding */
  font-size: 1em;
  font-weight: bold;
  color: #000; /* Matches link color */
  background-color: transparent; /* Matches global background */
  border: none;
  border-radius: 5px; /* Matches global border-radius */
  text-decoration: none; /* Remove underline */
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2); /* Matches hover background */
  }

  &:focus,
  &:active {
    outline: none;
    background-color: rgba(0, 0, 0, 0.2); /* Ensure consistency for focus/active states */
  }
`;

export default ButtonAsLink;
