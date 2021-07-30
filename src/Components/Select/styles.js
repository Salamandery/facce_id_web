import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  color: #666360;
  background: #e6e6e6;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div, & + select {
    margin-top: 8px;
  }

  ${(props) =>
    props.isFocused &&
    css`
      color: #3366ff;
      border-color: #3366ff;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #3366ff;
    `}
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  select {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;
    text-transform: uppercase;

    max-width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  svg {
    margin-right: 13px;
  }
`;

export const ErrorTooltip = styled(Tooltip)`
  height: 20px;
  margin-left: 34px;

  svg {
    margin-right: 0;
  }

  span {
    color: #fff;
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
