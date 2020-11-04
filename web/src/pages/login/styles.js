import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
  background: rgba(80, 80, 80, 0.9); /* opacity: 0.9*/
  padding: 20px;
  margin: auto;
  position: relative;
  margin-top: 40px;

  img {
    width: 80px;
    height: 80px;
    filter: invert(100%);
  }

  form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;

    strong {
      font-size: 18px;
      color: #fff;
      margin-bottom: 10px;
      cursor: default;
    }

    .divInput {
      margin: 4px 0;
      input {
        height: 26px;
        text-align: center;
        font-size: 14px;
        padding: 0 15px;
        width: 100%;
      }

      svg {
        position: absolute;
        color: #333;
        margin: 6px;
      }
    }

    button[type='submit'] {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      margin-bottom: 10px;
      border-radius: 2px;
      font-size: 20px;
      font-weight: bold;
      transition: background 0.5s;
      background: #00c4c4;
      color: #fff;

      &:hover {
        background: #009191;
      }
    }

    a {
      display: flex;
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      text-decoration: underline;
      opacity: 1;
      margin: 0 auto;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 4px;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;
