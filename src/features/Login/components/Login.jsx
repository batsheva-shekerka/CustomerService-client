import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../redux/Api';
import { setCredentials } from '../redux/loginSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Button, TextField, Typography, Container, 
  Paper, Alert, CircularProgress, InputAdornment, IconButton
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // 1. קריאה לשרת
      const result = await login(data).unwrap();
      
      if (result.token) {
        // 2. שמירה ב-Redux (וב-LocalStorage ליתר ביטחון עבור ה-ProtectedRoute)
        dispatch(setCredentials({ operator: result.user, token: result.token }));
        localStorage.setItem("token", result.token);

        // 3. פענוח הטוקן כדי לדעת לאן לנווט
        const decoded = jwtDecode(result.token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;

        console.log("משתמש התחבר עם תפקיד:", role);

        // 4. ניתוב לפי התפקיד
        switch(role) {
          case "SystemManager":
            navigate("/systemmanagerarea"); // עמוד רשימת מפעילים
            break;
          case "Admin":
            navigate("/managerarea"); // עמוד רשימת חברות
            break;
          case "Operator":
            navigate("/personalarea"); // אזור אישי
            break;
          default:
            navigate("/personalarea"); // ברירת מחדל
        }
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 3 }}>
        
        <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
          כניסה
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          שלום! אנא הזינו את פרטי ההתחברות
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="כתובת אימייל"
            {...register("email", { 
              required: "אימייל הוא שדה חובה",
              pattern: { value: /^\S+@\S+$/i, message: "כתובת אימייל לא תקינה" }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="סיסמה"
            type={showPassword ? 'text' : 'password'}
            {...register("password", { required: "סיסמה היא שדה חובה" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              פרטי התחברות שגויים, נסו שוב.
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold', borderRadius: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'התחברות'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;