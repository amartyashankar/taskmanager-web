import { createGlobalStyle } from 'styled-components';
import normalize from 'normalize.css';

export default createGlobalStyle`
  ${normalize}

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body,
  html {
    height: 100%;
    margin: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    background-color: #fff;
    line-height: 1.4;
  }

  a {
    display: inline-block;
    padding: 0.5em 1em;
    font-size: 1em;
    font-weight: bold;
    color: #000;
    text-decoration: none;
    background-color: transparent;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a:visited {
    color: #000;
  }

  a:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  

  code,
  pre {
    max-width: 100%;
    overflow: auto;
    margin: 0 auto;
  }
`;
