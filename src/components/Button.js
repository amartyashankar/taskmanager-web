import styled from 'styled-components';

const Button = styled.button`
  display: block;
  padding: 10px 20px; /* Add horizontal padding for the pill effect */
  border: none;
  border-radius: 50rem; /* Large value for a pill shape */
  font-size: 18px;
  color: #fff;
  background-color: #0077cc;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #005fa3;
  }
`;

export default Button;
