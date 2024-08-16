import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices/apiSlice'; // Import the apiSlice

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add apiSlice to the store
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware), // Add apiSlice middleware
  devTools: true, // Enable Redux DevTools extension
});

export default store;
