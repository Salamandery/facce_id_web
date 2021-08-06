import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  color: ${(props) => props.txtColor};
  padding: 0px 12px;
  background: ${(props) => props.bgColor};
`;
export const Intranet = styled.div`
  display: flex;
  margin-top: -5px;
  background: transparent;
  border: 0;
  text-decoration: none;
  text-transform: uppercase;
  align-self: center;
  color: #e6e6e6;
  font-size: 26px;
  font-family: sans-serif;
  font-weight: bold;
  align-items: center;

  &:hover {
    color: #fff;
  }

  @media (max-width: 640px) {
    font-size: 0.9em;
  }
`;
export const User = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
  align-items: flex-end;

  @media (max-width: 640px) {
    align-items: center;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px;

  @media (max-width: 640px) {
    display: none;
  }
`;
export const SystemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 5px 10px;

  > span {
    font-weight: bold;
  }

  @media (max-width: 640px) {
    display: none;
    justify-content: center;
    font-size: 0.7em;
  }
`;
export const Username = styled.p`
  color: #fff;
  font-weight: bold;
`;
export const ButtonPerfil = styled.button`
  background: transparent;
  border: 0;
  color: #e6e6e6;
  text-decoration: none;

  &:hover {
    color: #fff;
    cursor: pointer;
  }
`;
export const VersionNumber = styled.button`
  background: transparent;
  border: 0;
  color: #e6e6e6;
  text-decoration: none;

  &:hover {
    color: #fff;
    cursor: pointer;
  }

  @media (max-width: 650px) {
    font-size: 1em;
  }
`;
export const Sair = styled.button`
  background: #cc0000;
  height: 36px;
  border-radius: 5px;
  border: 0px;
  margin: 5px;
  padding: 5px 20px;
  color: #fff;
  font-weight: bold;

  &:hover {
    background: #800033;
    color: #fff;
  }

  @media (max-width: 640px) {
    height: 48px;
  }
`;
