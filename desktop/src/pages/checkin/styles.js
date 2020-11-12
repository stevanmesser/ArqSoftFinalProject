import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
  margin: auto;
  position: relative;
  margin-top: 40px;

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
    width: 300px;
    margin: auto;
  }

  input {
    text-align: center;
  }

  a {
    margin-top: 10px;
  }
`;
