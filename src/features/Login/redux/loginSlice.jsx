import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operator: null, // כאן יישמרו פרטי המשתמש (שם, תעודת זהות וכו') אחרי ההתחברות
  token: localStorage.getItem('token') || null, 
  isAuthenticated: !!localStorage.getItem('token'), 
};
const authSlice = createSlice({
  name: 'auth', // זה השם הפנימי של הסלייס
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // action.payload זה האובייקט שאת שולחת מהקומפוננטה
      const { operator, token } = action.payload;
      state.operator = operator;
      state.token = token;
      state.isAuthenticated = true;
      
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.operator = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// סלקטורים: שימי לב לשם שנתנו ב-Store (תכף נראה את ה-Store)
export const selectCurrentOperator = (state) => state.auth.operator;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer; // ייצוא של הרדיוסר