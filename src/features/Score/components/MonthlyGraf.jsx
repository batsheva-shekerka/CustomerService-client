import React from 'react';
import { CircularProgress, Alert, Box, Typography, Paper } from '@mui/material';
import { useMonthlyScoreGrafQuery } from '../redux/api';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyGraf = () => {
  const currentId = useSelector((state) => state.auth?.operator?.operatorId);

  const { 
    data: rawData = [], 
    isLoading, 
    isError, 
    error 
  } = useMonthlyScoreGrafQuery(currentId, { skip: !currentId });

  const list = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  if (isError) return <Alert severity="error" sx={{ mt: 2 }}>שגיאה: {error?.status}</Alert>;

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }} dir="rtl">
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a237e' }}>
        מרכז ביצועים אישי
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 4, backgroundColor: '#ffffff' }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: 'right' }}>
          מגמת שיפור בפרמטרים (לפי מספר שיחה)
        </Typography>
        
        {/* הגדרת גובה קשיח ל-Box כדי ש-ResponsiveContainer יעבוד */}
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={list} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              
              {/* כרגע משתמשים ב-scoreId כי אין date ב-DTO. 
                  ברגע שתוסיפי date ב-C#, תשני חזרה ל-dataKey="date" */}
              <XAxis dataKey="scoreId" label={{ value: 'מספר שיחה', position: 'insideBottom', offset: -5 }} />
              
              <YAxis domain={[0, 100]} />
              <Tooltip backgroundColor="#fff" />
              <Legend verticalAlign="top" height={36}/>

              <Line 
                name="טון" 
                type="monotone" 
                dataKey="operatorToneScore" // שם מדויק מה-DTO
                stroke="#8884d8" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
              />
              <Line 
                name="קונפליקטים" 
                type="monotone" 
                dataKey="conflictResolutionScore" // שם מדויק מה-DTO
                stroke="#82ca9d" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
              />
              <Line 
                name="מקצועיות" 
                type="monotone" 
                dataKey="professionalismScore" // שם מדויק מה-DTO
                stroke="#ffc658" 
                strokeWidth={3} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>

         
        </Box>
         <Typography variant="h6" sx={{ mb: 3, textAlign: 'right' }}>
מגמת שיפור חודשי לפי ממוצע        </Typography>
        <Box>
           <ResponsiveContainer width="100%" aspect={2.5}>
  <LineChart data={list}>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    
    {/* ציר X מציג עכשיו את שם החודש */}
    <XAxis dataKey="month" tick={{fill: '#666'}} /> 
    
    <YAxis domain={[0, 100]} />
    <Tooltip />
    <Legend verticalAlign="top" />

    {/* קו המציג את הממוצע הכללי */}
    <Line 
      name="ממוצע כללי" 
      type="monotone" 
      dataKey="avgOverall" 
      stroke="#6366f1" 
      strokeWidth={4} 
      dot={{ r: 6 }} 
    />
    
    {/* קו המציג שיפור בטון */}
    <Line 
      name="שיפור בטון" 
      type="monotone" 
      dataKey="avgTone" 
      stroke="#8884d8" 
      strokeDasharray="5 5" // קו מקווקו לפרמטרים משניים
    />
  </LineChart>
</ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default MonthlyGraf;