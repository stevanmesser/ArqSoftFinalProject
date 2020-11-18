import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding-top: 40px;
  flex-direction: row;

  * {
    font-size: 20px;
    text-align: center;
    padding: 4px;
    margin: 4px;
    border-radius: 8px;
  }

  button {
    background: #111;
    color: #fff;
    width: 100px;
    height: 34px;
  }
`;
