import styled from 'styled-components';

import { Container, Input, ButtonDefault } from '../../Style';

export const Content = styled.div`
  display: flex;
  padding: 10px;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  border: 1px solid #b2b2b2;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SchenduleContainer = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Wrapper = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;
export const TableContainer = styled.div`
  display: flex;
  padding: 5px;
  margin: 0;
  width: 100%;
  min-height: 30px;
  background: #e6e6e6;
`;
export const SearchInput = styled(Input)`
    width: 100%;
    line-height: 20px;
    padding: 5px 10px;
    margin 0 5px;
`;
export const ButtonSearch = styled(ButtonDefault).attrs({
  tp: 'action',
})``;
export const ButtonNovo = styled(ButtonDefault).attrs({
  tp: 'warn',
})`
  text-transform: uppercase;
`;
export const SchenduleTable = styled.table`
  display: block;
  background: #fff;
  overflow-x: auto;
  overflow-y: auto;
  height: 250px;
  width: 100%;

  thead {
    background-color: #333;
    color: #fff;
  }
  tbody {
    tr:nth-child(even) {
      background-color: #e6e6e6;
    }
    tr:not(:last-of-type) td {
      border-bottom: 1px solid #eee;
    }
  }
  td,
  th {
    width: auto;
    min-width: 75px;
    padding: 5px;
  }
  td:last-child, th:last-child {
    width: 100%;
  }
  td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 300px;
    text-transform: uppercase;
  }
`;
export const MonthListContainer = styled(Container)`
  display: ${(props) => (props.active ? 'block' : 'none')};
  padding: 0;
  margin: 0;
  width: 100%;

  .calendar-month {
    table-layout: fixed;
    width: 100%;
    padding: 10px 5px;
    text-align: center;
    font-weight: bold;
    background: #f2f2f2;

    .months {
      width: 100%;

      .month {
        padding: 5px;
        cursor: pointer;

        &:hover {
          background: #333;
          color: #fff;
        }
      }
    }
  }
`;
export const MonthSelectContainer = styled(Container)`
  padding: 0;
  margin: 0;
  width: 100%;
  flex-direction: column;

  > p {
    cursor: pointer;
    background: #9c0a05;
    padding: 5px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: #fff;
  }
`;
export const CalendarContainer = styled(Container)`
  padding: 0;
  margin: 0;
  width: 100%;
  flex-direction: column;
  align-items: center;

  > p {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    background: #4287f5;
    color: #fff;
    padding: 5px;
  }
`;
export const WeekDayContainer = styled(Container)`
  margin: 0;
  padding: 0;
  width: 100%;

  .calendar-day {
    table-layout: fixed;
    padding: 10px 5px;
    background: #fff;
    text-align: center;
    width: 100%;

    /* rows */
    .days {
      background: #f2f2f2;
      padding: 5px;
    }
    .empty {
      background: #e6e6e6;
    }
    .selected {
      font-weight: bold;
      color: #fff;
      background: #40a832;
      box-shadow: 0px 0px 10px 0.5px rgba(0, 0, 0, 0.2);
      border-radius: 4%;
    }
    .today {
      font-weight: bold;
      color: #fff;
      background: red;
      box-shadow: 0px 0px 10px 0.5px rgba(0, 0, 0, 0.2);
      border-radius: 4%;
    }

    /* column */
    .week-day {
      padding: 3px;
    }
  }
`;
