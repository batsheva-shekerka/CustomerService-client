
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/Login/redux/Api';
import authReducer from '../features/Login/redux/loginSlice';
import operatorReducer from '../features/operator/redux/operatorSlice';
import { operatorApi } from '../features/Operator/redux/api';
import companyReducer from '../features/company/redux/companySlice';
import { companyApi } from '../features/company/redux/api';
import callReducer from '../features/Calls/redux/callSlice';
import { callApi } from '../features/Calls/redux/api';


export const store = configureStore({
  reducer: {
    // השם כאן (auth) חייב להיות זהה למה שכתבת בסלקטורים!
    operators: operatorReducer,
    auth: authReducer, 
    companies: companyReducer,
    calls:callReducer,
    
    // החיבור של ה-API (חשוב מאוד!)
    [authApi.reducerPath]: authApi.reducer,
    [operatorApi.reducerPath]: operatorApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [callApi.reducerPath]: callApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(authApi.middleware)
  .concat(operatorApi.middleware)
  .concat(companyApi.middleware)
  .concat(callApi.middleware),

});