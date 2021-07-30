export function setMonth(month) {
  return {
    type: '@calendar/MONTH',
    payload: { month },
  };
}
export function setDay(day) {
  return {
    type: '@calendar/DAY',
    payload: { day },
  };
}
export function setYear(year) {
  return {
    type: '@calendar/YEAR',
    payload: { year },
  };
}
export function setFullDate(fullDate) {
  return {
    type: '@calendar/FULLDATE',
    payload: { fullDate },
  };
}
