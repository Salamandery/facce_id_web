import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setDay } from '../../Services/store/calendar/action';
import { WeekDayContainer } from './style';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function DayPicker({ dateObject }) {
  const dispatch = useDispatch();
  const [daysinmonth, setDaysInMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const weekdayshort = moment.weekdaysShort();

  const firstDayOfMonth = useCallback(() => {
    const firstDay = moment(dateObject).startOf('month').format('d');
    return firstDay;
  }, [dateObject]);

  const TotaldaysInMonth = useCallback(() => {
    const firstDay = moment(dateObject).daysInMonth();
    return firstDay;
  },[dateObject]);

  const Today = useCallback(() => {
    return dateObject.format('D');
  }, [dateObject]);

  const getDayInMonth = useCallback(() => {
    const blanks = [];

    for (let i = 0; i < firstDayOfMonth(); i++) {
      blanks.push(<td key={`empty${i}`} className="days empty" />);
    }

    const daysInMonth = [];

    for (let d = 1; d <= TotaldaysInMonth(); d++) {
      const currentDay = d.toString() === Today() ? 'today' : '';
      const selected = d === selectedDay ? 'selected' : '';
      daysInMonth.push(
        <td
          key={d}
          className={`days ${currentDay} ${selected}`}
          onClick={() => {
            setSelectedDay(d);
            dispatch(setDay(d));
          }}
        >
          {d}
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonth];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells);
      }
    });

    setDaysInMonth(rows);
  }, [firstDayOfMonth, TotaldaysInMonth, selectedDay, Today, dispatch]);

  useEffect(() => {
    getDayInMonth();
  }, [getDayInMonth]);

  return (
    <WeekDayContainer>
      <table className="calendar-day">
        <thead>
          <tr>
            { weekdayshort.map((day) => {
              return (
                <th key={day} className="week-day">
                  {day}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {daysinmonth ? daysinmonth.map((d, i) => <tr key={i}>{d}</tr>) : null}
        </tbody>
      </table>
    </WeekDayContainer>
  );
}
