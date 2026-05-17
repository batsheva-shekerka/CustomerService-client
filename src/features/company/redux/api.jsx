import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const companyApi = createApi({
  reducerPath: 'companyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7124/api/Company/' }),
  
  // הגדרת "תגים" - זה עוזר ל-RTK לדעת מתי לרענן את הנתונים
  tagTypes: ['company'], 

  endpoints: (builder) => ({
    
    // 1. שליפת כל המפעילים
    getAllCompanies: builder.query({
      query: () => '', 
      providesTags: ['Company'], // הקריאה הזו "מספקת" נתוני מפעילים
    }),
    getByIdCompany: builder.query({
      query: (id) => `${id}`, 
      providesTags: ['Company'], // הקריאה הזו "מספקת" נתוני מפעילים
    }),
    // 2. הוספת מפעיל חדש
    addCompany: builder.mutation({
      query: (newCompany) => ({
        url: '',
        method: 'POST',
        body: newCompany,
      }),
      // אומר ל-RTK: "ברגע שהוספת, התג 'Operator' כבר לא תקף, לך תביא רשימה חדשה"
      invalidatesTags: ['Company'], 
    }),

    // 3. מחיקת מפעיל
    deleteCompany: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Company'], // מרענן את הרשימה אחרי מחיקה
    }),

    // 4. עדכון מפעיל
    updateCompany: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Company'], // מרענן את הרשימה אחרי עדכון
    }),
   GetDailyImprovement: builder.query({
  // יוצאים מ-score ונכנסים ל-operator
  query: (id) => `../Call/GetDailyImprovement/${id}`, 
  providesTags: ['Company'],
}), 
 GetWeeklyImprovement: builder.query({
  // יוצאים מ-score ונכנסים ל-operator
  query: (id) => `./GetWeeklyImprovement/${id}`, 
  providesTags: ['Company'],
}), 

    // // 5. שליפת שיחות של מפעיל (שימי לב - זה Query)
    // getOperatorCalls: builder.query({
    //   query: (id) => `${id}/calls`,
    //   // אפשר להוסיף תג ספציפי לשיחות אם תרצי שזה יתרענן בנפרד
    // }),

  }),
});

export const { 
  useGetAllCompaniesQuery, 
  useAddCompanyMutation, 
  useDeleteCompanyMutation, 
  useUpdateCompanyMutation, 
  useGetCompanyCallsQuery,
  useGetDailyImprovementQuery,
  useGetWeeklyImprovementQuery,
  useGetByIdCompanyQuery
} = companyApi;