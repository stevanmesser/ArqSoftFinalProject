import styled from 'styled-components';

export const Container = styled.div`
  .menu {
    margin: 4px;
  }

  input {
    margin: 4px;
    padding: 2px;
  }

  button {
    padding: 2px;
  }

  ul {
    width: 1000px;
  }

  li {
    margin: 4px;

    strong {
      color: #fff;
      margin-left: 4px;
    }

    svg {
      height: 20px;
      width: 20px;
      transition: background 0.5s;
      border-radius: 50%;
      background: transparent;
      color: #fff;

      &:hover {
        background: #fff;
        color: #333;
      }
    }
  }
`;
