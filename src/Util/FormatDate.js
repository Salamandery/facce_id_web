import moment from 'moment-timezone';

export function formatDate(date) {
  date = moment.tz(date, process.env.REACT_APP_TZ).format('DD/MM/YYYY HH:mm');
  return date;
}
export function InputformatDate(date) {
  return moment(date).format('YYYY-MM-DDTkk:mm');
}
