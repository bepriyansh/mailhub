import { configureStore } from '@reduxjs/toolkit';
import emailReducer from './emailSlice';

const store = configureStore({
  reducer: {
    email: emailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
