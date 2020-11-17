import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline: 0,
  }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: #505050ff;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }

  input {
    background: #e2e2e2ff;
    color: #111;
    border: 0;
    border-bottom: 1px solid #eee;
    border-radius: 3px;

    &::placeholder {
      color: #333;
    }
  }

  button {
    cursor: pointer;
    border: 0;
  }

  label {
    color: #fff;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  strong {
    cursor: default;
  }

  select {
    background: #e2e2e2ff;
    border-radius: 3px;
  }

  .link {
    display: flex;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    /* text-decoration: underline; */
    opacity: 1;
    background: #111;
    width: fit-content;
    border-radius: 8px;
    padding: 4px 8px;
    font-weight: bold;
    /* margin: 0 auto; */
    /* justify-content: center;
    align-items: center; */

    svg {
      margin-right: 4px;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;
