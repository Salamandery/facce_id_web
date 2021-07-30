import styled from 'styled-components';

export const Container = styled.div`
  pointer-events: none;
  position: fixed;
  width: 100%;
  top: ${(props) => props.clientY + 'px' || 0};
  left: ${(props) => props.clientX + 10 + 'px' || 0};
  padding: 0px;

  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => props.AlignitemsModal || 'flex-start'};
`;
export const Content = styled.div`
  display: flex;
  pointer-events: auto;
  flex-direction: column;
  justify-content: ${(props) => props.content || 'center'};
  align-items: ${(props) => props.items || 'center'};
  background: rgba(204, 204, 204, 1);
  border: 1px solid #000;
  border-radius: 5px;
  padding: 10px;
  width: ${(props) => (props.size ? props.size : '400px')};
  height: ${(props) => (props.h ? '100%' : 'auto')};

  h1 {
    font-size: 32px;
  }

  span {
    padding-bottom: 7px;
    font-size: 12px;
  }

  .closeModal {
    margin-bottom: 5px;
    display: flex;
    justify-content: space-around;
    align-self: flex-start;
    border: 0;
    border-radius: 4px;
    font-size: 14px;
    color: red;
    font-weight: bold;
    background: rgba(204, 204, 204, 1);
  }
`;
