import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'atomiccodes@genleito',
      storage,
      whitelist: ['auth', 'user', 'calendar'],
    },
    reducers
  );

  return persistedReducer;
};
