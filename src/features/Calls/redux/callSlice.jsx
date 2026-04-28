import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // רשימת החברות תנוהל על ידי RTK Query ב-Cache, 
  // לכן אין צורך ב-list: [] כאן.
  status: 'idle',
  error: null
};

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    // השארתי רק את ניקוי השגיאות למקרה שתצטרכי לאפס הודעה במסך
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { clearError } = callsSlice.actions;
export default callsSlice.reducer;