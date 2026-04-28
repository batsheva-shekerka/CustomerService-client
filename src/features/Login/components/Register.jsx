import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../../Redux/CustomerApi';

const Register = () => {
  // אתחול react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  // אתחול המוטציה של RTK Query
  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      // שליחת הנתונים ל-API
      await registerUser(data).unwrap();
      alert('ההרשמה בוצעה בהצלחה!');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="auth-form">
      <h2>יצירת חשבון חדש</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* שדה שם מלא */}
        <input 
          {...register("fullName", { required: "שם מלא הוא שדה חובה" })} 
          placeholder="שם מלא"
        />
        {errors.fullName && <p style={{color: 'red'}}>{errors.fullName.message}</p>}

        {/* שדה אימייל */}
        <input 
          {...register("email", { 
            required: "אימייל חובה",
            pattern: { value: /^\S+@\S+$/i, message: "אימייל לא תקין" }
          })} 
          placeholder="דואר אלקטרוני"
        />
        {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}

        {/* שדה סיסמה */}
        <input 
          type="password"
          {...register("password", { 
            required: "סיסמה חובה", 
            minLength: { value: 6, message: "מינימום 6 תווים" } 
          })} 
          placeholder="סיסמה"
        />
        {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'שולח נתונים...' : 'הירשם עכשיו'}
        </button>

        {isError && <p style={{color: 'red'}}>שגיאה: {error.data?.message || 'משהו השתבש'}</p>}
      </form>
    </div>
  );
};

export default Register;