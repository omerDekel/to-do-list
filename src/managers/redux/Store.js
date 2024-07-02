import { configureStore } from '@reduxjs/toolkit';
import TasksReducer, { tasksActions } from './reducers/TasksReducer';

export const resetStore = () => {
  store.dispatch(tasksActions.reset());
};

const store = configureStore({
  reducer: {
    tasks: TasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;