import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  width: 300px;
  animation: ${rotate} 15s linear infinite;
  opacity: 0.1;
`;
export const Text = styled.p`
  margin-top: 35px;
  font-size: 20px;
  font-weight: bold;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: ${({ h }) => h || '100%'};
  border-radius: 4px;
  background: ${({ bgColor }) => bgColor || '#fff'};

  thead,
  tbody tr {
    table-layout: fixed;
  }
  thead {
    background: #333;
  }
  thead th {
    border: 0;
  }
  thead th {
    background: ${({ titleBgColor }) => titleBgColor || '#333'};
    color: ${({ titleColor }) => titleColor || '#FFF'};
    text-align: ${({ titleAlign }) => titleAlign || 'left'};
    padding: 12px;
    text-transform: uppercase;
  }
  tbody {
    width: 100%;
    height: 100%;
  }
  tbody {
    overflow-y: auto;
  }
  tbody tr:not(:last-of-type) td {
    border-bottom: 1px solid #666;
  }
  tbody tr td {
    border-right: 1px solid #666;
    text-transform: ${({ upper }) => upper || 'uppercase'};
    padding: 12px;
    text-align: ${({ textAlign }) => textAlign || 'left'};
    vertical-align: middle;
    font-weight: bold;
    color: ${({ textColor }) => textColor || '#666'};
    font-size: ${({ fontSize }) => fontSize || '18px'};
    text-transform: uppercase;
  }

  ${({ childGroup }) =>
    childGroup
      ? "tbody tr td:first-child {display: flex;width: 5%;justify-content: 'flex-end'};flex-direction: row;} thead tr th:first-child {text-align: center;} "
      : ''}
`;
