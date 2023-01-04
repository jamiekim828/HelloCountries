import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import countryReducer from './slice/country';

const store = configureStore({
  reducer: { country: countryReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
