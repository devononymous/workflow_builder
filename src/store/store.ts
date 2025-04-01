// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workflowReducer from './slices/workFlowSlice'; // Add this import


export const store = configureStore({
  reducer: {
    auth: authReducer,
    workflows: workflowReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

