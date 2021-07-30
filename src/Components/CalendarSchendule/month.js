import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setFullDate, setMonth } from '../../Services/store/calendar/action';
import { MonthSelectContainer, MonthListContainer } from './style';

import 'moment/locale/pt-br';

moment.locale('pt-br');

export default function MonthPicker({ active, dateObject }) {
  const dispatch = useDispatch();
  const allMonth = moment.months();
  const [MonthSelector, setMonthSelect] = useState(false);
  const [monthlist, setMonthList] = useState(active);

  const Month = () => {
    return dateObject.format('MMMM');
  };
  const Year = () => {
    return dateObject.format('YYYY');
  };

  useEffect(() => {
    MonthList();
  }, []);

  const setMonthPicker = (month) => {
    const monthNo = allMonth.indexOf(month);
    let date = { ...dateObject };
    date = moment(date).set('month', monthNo);

    dispatch(setFullDate(date));
    dispatch(setMonth(date.format('M')));
    setMonthSelect(false);
  };

  const MonthList = () => {
    const months = [];

    allMonth.map((data) => {
      months.push(
        <td
          key={data}
          className="month"
          onClick={() => {
            setMonthPicker(data);
          }}>
          <span>{data}</span>
        </td>
      );
    });

    const rows = [];
    let cells = [];

    months.forEach((row, i) => {
      if (i % 3 !== 0 || i === 0) {
        cells.push(row);
      } else {
        rows.push(cells);
        cells = [];
        cells.push(row);
      }
    });

    rows.push(cells);

    const monthlist = rows.map((d, i) => {
      return (
        <tr className="months" key={i}>
          {d}
        </tr>
      );
    });

    setMonthList(monthlist);
  };
  return (
    <MonthSelectContainer>
      <p onClick={()=>{setMonthSelect(!MonthSelector)}}>{`${Month() } / ${ Year()}`}</p>
      <MonthListContainer active={MonthSelector}>
          <table className="calendar-month">
              <tbody>{monthlist || null}</tbody>
        </table>
      </MonthListContainer>
    </MonthSelectContainer>
  );
}
