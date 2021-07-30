import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
  setFullDate,
  setMonth,
  setDay,
} from '../../Services/store/calendar/action';
import { CalendarContainer, Content } from './style';
import MonthPicker from './month';
import DayPicker from './day';
import Schendule from './schendule';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function Calendar({ data, noSchendule }) {
  const dispatch = useDispatch();
  const dateObject = useSelector((state) => moment(state.calendar.fullDate));
  const selectedDay = useSelector((state) => state.calendar.day);
  const selectedMonth = useSelector((state) => state.calendar.month);

  useEffect(() => {
    dispatch(setFullDate(moment()));
    dispatch(setMonth(moment().format('M')));
    dispatch(setDay(moment().format('D')));
  }, []);
  return (
    <Content>
      <CalendarContainer>
        <p>Calendário</p>
        <MonthPicker active={false} dateObject={dateObject} />
        <DayPicker dateObject={dateObject} />
        {noSchendule ? (
          <Schendule
            dateObject={dateObject}
            day={selectedDay}
            month={selectedMonth}
            tableData={data}
          />
        ) : null}
      </CalendarContainer>
    </Content>
  );
}
