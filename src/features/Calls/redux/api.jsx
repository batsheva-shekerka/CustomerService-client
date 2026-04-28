import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const callApi = createApi({
  reducerPath: 'callApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7124/api/call/' }),
  
  // הגדרת "תגים" - זה עוזר ל-RTK לדעת מתי לרענן את הנתונים
  tagTypes: ['Call'], 

  endpoints: (builder) => ({
    
    // 1. שליפת כל המפעילים
    getAllCalls: builder.query({
      query: () => '', 
      providesTags: ['Call'], // הקריאה הזו "מספקת" נתוני מפעילים
    }),

    // 2. הוספת מפעיל חדש
    addCall: builder.mutation({
      query: (newCall) => ({
        url: '',
        method: 'POST',
        body: newCall,
      }),
      // אומר ל-RTK: "ברגע שהוספת, התג 'Operator' כבר לא תקף, לך תביא רשימה חדשה"
      invalidatesTags: ['Call'], 
    }),

    // 3. מחיקת מפעיל
    deleteCall: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Call'], // מרענן את הרשימה אחרי מחיקה
    }),

    // 4. עדכון מפעיל
    updateCall: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Call'], // מרענן את הרשימה אחרי עדכון
    }),

    // 5. שליפת שיחות של מפעיל (שימי לב - זה Query)
    getOperatorCalls: builder.query({
      query: (id) => `${id}`,
      method: 'GET',
    }),

     // 5.שליפת ציון לפי שיחה
    getScoreCall: builder.query({
      query: (id) => `${id}`,
      method: 'GET',
    }),

  }),
});

export const { 
  useGetAllCallsQuery, 
  useAddCallMutation, 
  useDeleteCallMutation, 
  useUpdateCallMutation, 
  useGetOperatorCallsQuery 
} = callApi;