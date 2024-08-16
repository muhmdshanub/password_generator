import { apiSlice } from './apiSlice';

const PASSWORD_URL = '/password';

export const passwordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generatePassword: builder.query({
      query: () => ({
        url: `${PASSWORD_URL}/generate`,
        method: 'GET', // Make sure GET is the correct method
      }),
    }),
  }),
  
});

export const {
  useGeneratePasswordQuery,
} = passwordApiSlice;
