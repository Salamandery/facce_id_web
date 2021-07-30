import styled from 'styled-components';
import { Input } from '../../../Style';

export const Save = styled.button`
  display: flex;
  font-size: 17px;
  background: #ff0000;
  border-radius: 5px;
  border: 0px;
  align-self: flex-end;
  margin-bottom: 10px;
  padding: 10px 20px;
  color: #fff;
  font-weight: bold;

  > span {
    margin-left: 10px;
    font-size: 14px;
  }
  &:hover {
    background: #b30000;
    color: #fff;
  }
`;
export const ChangePassword = styled.div`
  align-self: stretch;
  width: 100%;
  display: flex;
  border-top: 1px solid #333;
  padding-top: 10px;
  flex-direction: column;
`;
export const FormInput = styled(Input)`
  text-transform: none;
`;
