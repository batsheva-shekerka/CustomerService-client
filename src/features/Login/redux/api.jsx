import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7124/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'Login',
        method: 'POST',
      body: {
      email: credentials.email,
      passwordHash: credentials.password // כאן קורה הקסם
    },      }),
    }),
    // הוספת פונקציית ההרשמה
    register: builder.mutation({
      query: (newUser) => ({
        url: 'register',
        method: 'POST',
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;