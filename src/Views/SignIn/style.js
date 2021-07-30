import styled from 'styled-components';

import { Wrapper } from '../../Style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 70%;
`;

export const LoginForm = styled.div`
  position: relative;
  top: 100px;
  margin: auto 0px;
  border: 1px solid #c1b2b2;
  background: #fff;
  padding: 20px 20px;
  width: 35%;
  display: flex;
  color: #fff;
  align-self: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  > span {
    align-self: center;
    color: #333;
    font-family: sans-serif;
  }
  
  #title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 70px;
  }
  
  #subtitle {
    text-align: center;
    width: 200px;
    font-size: 16px;
    margin-top: 10px;
    margin-bottom: 45px;
  }

  a {
    text-decoration: none;
    color: #929292;
    &:hover {
      color: #666;
    }
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1024px) {
    width: 35%;
  }
  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const Login = styled.button`
  background: #006622;
  border: 0px;
  align-self: stretch;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 8px 35px;
  color: #fff;
  font-weight: bold;
  
  &:hover {
    background: #002699;
    color: #fff;
  }
`;

export const FormWrapper = styled(Wrapper)`
  padding: 10px 0px;

  span {
    color: #999;
    margin-bottom: 5px;
    text-transform: uppercase;
  }
`;

export const Logo = styled.div`
  position: absolute;
  border: 1px solid #c1b2b2;
  top: 0;
  margin-top: -50px;
  width: 200px;
  height: 90px;
  background: #fff;
`;