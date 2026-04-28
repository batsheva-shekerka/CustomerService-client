import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // בגלל ש-RTK Query שומר את רשימת המפעילים ב-Cache שלו,
  // אנחנו משאירים כאן רק נתונים שלא קשורים ישירות ל-API,
  // כמו למשל רשימת השיחות של הטלפנית שנבחרה כרגע.
  currentOperatorCalls: [],
  status: 'idle',
  error: null
};

const operatorsSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {
    // פעולה לעדכון ידני של רשימת השיחות אם תרצי
    setOperatorCalls: (state, action) => {
      state.currentOperatorCalls = action.payload;
    },
    // ניקוי שגיאות
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { setOperatorCalls, clearError } = operatorsSlice.actions;
export default operatorsSlice.reducer;