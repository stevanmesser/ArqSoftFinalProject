import styled from 'styled-components';

export const Container = styled.div`
  ul {
    width: 1000px;
  }

  li {
    height: 50px;
  }

  svg {
    height: 40px;
    width: 40px;
    transition: background 0.5s;
    border-radius: 50%;
    background: transparent;
    color: #fff;

    &:hover {
      background: #fff;
      color: #333;
    }
  }
`;
