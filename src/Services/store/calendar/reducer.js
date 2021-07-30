import producer from 'immer';
import moment from 'moment';

const INITIAL_STATE = {
  month: moment().format('M'),
  day: moment().format('D'),
  year: moment().format('YYYY'),
  fullDate: moment(),
};

export default function auth(state = INITIAL_STATE, action) {
  return producer(state, (draft) => {
    switch (action.type) {
      case '@calendar/MONTH': {
        draft.month = action.payload.month;
        break;
      }
      case '@calendar/DAY': {
        draft.day = action.payload.day;
        break;
      }
      case '@calendar/YEAR': {
        draft.year = action.payload.year;
        break;
      }
      case '@calendar/FULLDATE': {
        draft.fullDate = action.payload.fullDate;
        break;
      }
      default: {
      }
    }
  });
}
