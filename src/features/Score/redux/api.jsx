import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const scoreApi = createApi({
  reducerPath: 'scoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7124/api/score/' }),
  
  // הגדרת "תגים" - זה עוזר ל-RTK לדעת מתי לרענן את הנתונים
  tagTypes: ['Score'], 

  endpoints: (builder) => ({
    
    // 1. שליפת כל הציונים
    getAllScores: builder.query({
      query: () => '', 
      providesTags: ['Score'], // הקריאה הזו "מספקת" נתוני מפעילים
    }),

    // 2. הוספת מפעיל חדש
    addScore: builder.mutation({
      query: (newCallScore) => ({
        url: '',
        method: 'POST',
        body: newScore,
      }),
      // אומר ל-RTK: "ברגע שהוספת, התג 'Operator' כבר לא תקף, לך תביא רשימה חדשה"
      invalidatesTags: ['Score'], 
    }),

    // 3. מחיקת מפעיל
    deleteScore: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Score'], // מרענן את הרשימה אחרי מחיקה
    }),

    // 4. עדכון מפעיל
    updateScore: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Score'], // מרענן את הרשימה אחרי עדכון
    }),
// 5. גרף ציון חודשי
MonthlyScoreGraf: builder.query({
  query: (id) => `GetAllMonthScore/${id}`, // הוספת לוכסן להפרדה
  providesTags: ['Score'], // ב-Query משתמשים ב-providesTags (ולא invalidates)
}),

    
    // // 5.שליפת ציון לפי שיחה
    // getOperatorCalls: builder.query({
    //   query: (id) => `${id}`,
    //   method: 'GET',
    // }),

  }),
});

export const { 
  useGetAllScoresQuery, 
  useAddScoreMutation, 
  useDeleteScoreMutation, 
  useUpdateScoreMutation, 
  useMonthlyScoreGrafQuery
//   useGetOperatorCallsQuery 
} = scoreApi;