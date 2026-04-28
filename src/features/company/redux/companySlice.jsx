import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // רשימת החברות תנוהל על ידי RTK Query ב-Cache, 
  // לכן אין צורך ב-list: [] כאן.
  status: 'idle',
  error: null
};

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    // השארתי רק את ניקוי השגיאות למקרה שתצטרכי לאפס הודעה במסך
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { clearError } = companiesSlice.actions;
export default companiesSlice.reducer;