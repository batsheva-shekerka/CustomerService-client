import React from 'react';
import { CircularProgress, Alert, Box } from '@mui/material';
import { useMonthlyScoreGrafQuery } from '../redux/api';
import { useSelector } from 'react-redux';

const MonthlyGraf = () => {
  // 1. שליפת ה-ID של המפעיל מה-Store
  const currentId = useSelector((state) => state.auth?.operator?.operatorId);

  // 2. קריאה לנתונים - ה-Hook ירוץ רק כשיש currentId
  const { 
    data: rawData = [], 
    isLoading, 
    isError, 
    error 
  } = useMonthlyScoreGrafQuery(currentId, { 
    skip: !currentId // מדלג על הקריאה כל עוד ה-ID לא קיים
  });

  // 3. הבטחה שהנתונים הם מערך (למקרה שה-API מחזיר אובייקט בודד)
  const list = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);

  // תצוגת טעינה
  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress />
    </Box>
  );
  
  // תצוגת שגיאה
  if (isError) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      שגיאה בטעינת נתונים: {error?.data?.title || error?.error || "שגיאה לא ידועה"}
    </Alert>
  );

  return (
    <div style={{ padding: '20px' }} dir="rtl">
      <h2>רשימת ציונים חודשית</h2>
      
      {list.length === 0 ? (
        <p>אין נתונים להצגה.</p>
      ) : (
        <table border="1" style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th>ID ציון</th>
              <th>טון מפעיל</th>
              <th>פתרון קונפליקטים</th>
              <th>מקצועיות</th>
              <th>ציון סופי</th>
              <th>טיפים לייעול</th>
            </tr>
          </thead>
          <tbody>
            {list.map((call, index) => (
              <tr key={call.scoreId || index}>
                <td>{call.scoreId}</td>
                <td>{call.operatorToneScore}</td>
                <td>{call.conflictResolutionScore}</td>
                <td>{call.professionalismScore}</td>
                <td>{call.overallScore}</td>
                <td>{call.improvementTips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

       
    </div>
  );
};

export default MonthlyGraf;