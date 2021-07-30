import styled from 'styled-components';

export const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
`;
export const Wrapper = styled.div`
  display: flex;
  height: ${(props) => props.h};
  width: ${(props) => props.w};
  padding: ${(props) => props.pad};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.bgColor};
`;
export const Content = styled.div`
  display: flex;
  width: 100%;
  align-self: stretch;
  overflow: auto;
  padding: ${(props) => (props.pad ? '0' : '0 10px')};
  flex-direction: column;
  height: 100%;

  -webkit-transition: all 1s ease;
  -moz-transition: all 1s ease;
  -o-transition: all 1s ease;
  -ms-transition: all 1s ease;
  transition: all 1s ease;
`;
export const MenuBar = styled.div`
  width: ${(props) => (props.status === true ? '10%' : '3%')};
  background-color: #003d99;
  overflow: hidden;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: width 0.5s ease;

  @media (max-width: 1600px) {
    width: ${(props) => (props.status === true ? '20%' : '3.5%')};
  }
  @media (max-width: 1360px) {
    width: ${(props) => (props.status === true ? '20%' : '4.2%')};
  }
  @media (max-width: 1200px) {
    width: ${(props) => (props.status === true ? '20%' : '4.8%')};
  }
  @media (max-width: 650px) {
    width: 0;
  }
`;
export const ButtomMenu = styled.button`
  padding: 0px 15px;
  text-align: center;
  color: #e6e6e6;
  font-size: 24px;
  background: #003380;
  border: 0;

  &:hover {
    color: #fff;
  }
`;
export const LabelMenu = styled.div`
  border: 0;
  background: transparent;
  display: flex;
  align-self: stretch;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  padding: 5px 10px;
`;
export const ItemMenu = styled.button`
  justify-content: baseline;
  align-self: stretch;
  font-size: 26px;
  text-align: left;
  padding: 2px 5px;
  border: 0;
  background: transparent;
  color: #e6e6e6;

  &:hover {
    opacity: 0.7;
    color: '#fff';
  }
`;
export const GroupLabel = styled.div`
  flex-direction: column;
  align-self: stretch;

  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  -ms-transition: all 0.5s ease;
  transition: height 0.5s ease;
`;
