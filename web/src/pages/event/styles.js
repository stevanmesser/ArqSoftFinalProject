import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: rgba(80, 80, 80, 0.9); /* opacity: 0.9*/
  padding: 20px;
  position: relative;

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
    margin-top: 20px;
    width: 400px;
    /* background: #fff; */
  }

  li {
    margin: 4px;
    align-items: center;

    strong {
      color: #fff;
      margin-left: 8px;
    }

    svg {
      height: 26px;
      width: 26px;
      transition: background 0.5s;
      border-radius: 50%;
      background: transparent;
      color: #fff;

      &:hover {
        background: #fff;
        color: #333;
        cursor: pointer;
      }
    }
  }
`;
