import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // רשימת החברות תנוהל על ידי RTK Query ב-Cache, 
  // לכן אין צורך ב-list: [] כאן.
  status: 'idle',
  error: null
};

const scoresSlice = createSlice({
  name: 'scores',
  initialState,
  reducers: {
    // השארתי רק את ניקוי השגיאות למקרה שתצטרכי לאפס הודעה במסך
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { clearError } = scoresSlice.actions;
export default scoresSlice.reducer;