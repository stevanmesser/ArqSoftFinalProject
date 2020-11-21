import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  padding: 20px;
  margin: auto;
  position: relative;

  * {
    display: block;
  }

  strong {
    margin-top: 20px;
    margin-bottom: 6px;
    color: #fff;
    font-size: 18px;
    font-weight: normal;
  }

  form {
    display: flex;
    flex-direction: column;
    margin: 100px auto auto auto;
    width: 300px;
  }

  input {
    text-align: center;
    width: 100%;
    font-size: 20px;
  }

  a {
    margin-top: 10px;
  }

  button {
    width: 120px;
    margin: 4px;
    padding: 4px;
  }

  .divButtons {
    flex-direction: row;
    display: flex;
    margin-top: 10px;
    font-size: 16px;
  }
`;
