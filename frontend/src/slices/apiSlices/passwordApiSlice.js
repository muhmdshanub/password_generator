import { apiSlice } from './apiSlice';

const PASSWORD_URL = '/password';

export const passwordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generatePassword: builder.query({
      query: (params) => ({
        url: `${PASSWORD_URL}/generate`,
        method: 'GET', // Make sure GET is the correct method
        params: {
          length: params.length,
          includeUppercase: params.includeUppercase,
          includeLowercase: params.includeLowercase,
          includeNumbers: params.includeNumbers,
          includeSymbols: params.includeSymbols,
          startWithLetter: params.startWithLetter,
          noSimilar: params.noSimilar,
          noDuplicate: params.noDuplicate,
          noSequential: params.noSequential,
        }
      }),
    }),
  }),
});

export const {
  useLazyGeneratePasswordQuery,
  useGeneratePasswordQuery, 
} = passwordApiSlice;
