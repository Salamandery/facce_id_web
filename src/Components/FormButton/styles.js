import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  position: relative;
  background: ${(props) => props.bgColor || '#fff'};
  height: ${(props) =>
    props.size === 'small'
      ? '50px'
      : props.size === 'md'
      ? '100px'
      : props.size === 'high'
      ? '200px'
      : '36px'};
  width: ${(props) =>
    props.size === 'small'
      ? '50px'
      : props.size === 'md'
      ? '150px'
      : props.size === 'high'
      ? '200px'
      : '36px'};
  border-radius: 5px;
  border: ${(props) => props.border || '1px solid black'};
  margin: 5px;
  padding: 0;

  button {
    position: absolute;
    top: 5px;
    left: 7px;
    background: transparent;
    width: 18px;
    height: 18px;
    border: 0;
    opacity: 0.8;
    transition: opacity 0.2s;

    > svg {
      color: #fff;

      ${(props) => (props.favorited === true ? `color: yellow;` : null)}
    }

    &:hover {
      opacity: 1;
    }
  }
`;
export const CardButton = styled.div`
  display: flex;
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : null)};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  flex: 1;
  border: 0;
  margin: 0;
  padding: 0;
  color: ${(props) => props.fColor || '#333'};
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.fhColor || '#fff'};
  }

  > span {
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
    font-size: ${(props) => props.SPSize || '15px'};
    text-transform: uppercase;
  }
  > p {
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: underline;
    color: #ffb3b3;
    margin-top: 2px;
  }
`;
