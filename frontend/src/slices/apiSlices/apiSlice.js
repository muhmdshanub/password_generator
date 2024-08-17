import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

// Update baseQuery without authentication or refresh token logic
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: 'include', // Include credentials with every request, if needed
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Password'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
