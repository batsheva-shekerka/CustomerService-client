import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const operatorApi = createApi({
  reducerPath: 'operatorApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7124/api/Operator/' }),
  
  // הגדרת "תגים" - זה עוזר ל-RTK לדעת מתי לרענן את הנתונים
  tagTypes: ['Operator'], 

  endpoints: (builder) => ({
    
    // 1. שליפת כל המפעילים
    getAllOperators: builder.query({
      query: () => '', 
      providesTags: ['Operator'], // הקריאה הזו "מספקת" נתוני מפעילים
    }),

    // 2. הוספת מפעיל חדש
    addOperator: builder.mutation({
      query: (newOperator) => ({
        url: '',
        method: 'POST',
        body: newOperator,
      }),
      // אומר ל-RTK: "ברגע שהוספת, התג 'Operator' כבר לא תקף, לך תביא רשימה חדשה"
      invalidatesTags: ['Operator'], 
    }),

    // 3. מחיקת מפעיל
    deleteOperator: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Operator'], // מרענן את הרשימה אחרי מחיקה
    }),

    // 4. עדכון מפעיל
    updateOperator: builder.mutation({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Operator'], // מרענן את הרשימה אחרי עדכון
    }),

    // 5. שליפת שיחות של מפעיל (שימי לב - זה Query)
    getOperatorCalls: builder.query({
      query: (id) => `${id}/calls`,
      // אפשר להוסיף תג ספציפי לשיחות אם תרצי שזה יתרענן בנפרד
    }),

  }),
});

export const { 
  useGetAllOperatorsQuery, 
  useAddOperatorMutation, 
  useDeleteOperatorMutation, 
  useUpdateOperatorMutation, 
  useGetOperatorCallsQuery 
} = operatorApi;