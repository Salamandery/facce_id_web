import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

export const Container = styled.div`
  color: #666360;
  border: 1px solid #c1b2b2;
  padding: 8px;
  padding-left: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  & + div, & + select {
    margin-top: 8px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #3366ff;
      border-color: #3366ff;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #3366ff;
    `}
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #333;
    text-transform: uppercase;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const ErrorTooltip = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

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