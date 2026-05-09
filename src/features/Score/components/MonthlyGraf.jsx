import React, { useState } from 'react';
import { Button, CircularProgress, Alert, Box } from '@mui/material';
import { useMonthlyScoreGrafQuery, useDeleteScoreMutation} from '../redux/api';
import AddScore from '../../Score/components/AddScore';

const MonthlyGraf = ({ readOnly = false, operatorId = null })=>{
// 1. קריאה לכל השיחות - תתבצע רק אם אנחנו לא במצב readOnly
  const { 
    data: allCalls = [], 
    isLoading: isLoadingAll, 
    isError: isErrorAll, 
    error: errorAll 
  } = useMonthlyScoreGrafQuery(undefined, { skip: readOnly });

  // 2. קריאה לשיחות של מפעיל ספציפי - תתבצע רק אם אנחנו ב-readOnly ויש operatorId
  const { 
    data: operatorCalls = [], 
    isLoading: isLoadingOp, 
    isError: isErrorOp, 
    error: errorOp 
  } = useMonthlyScoreGrafQuery(operatorId, { skip: !readOnly || !operatorId });


  // מבטיח ש-list תמיד יהיה מערך, גם אם הגיע אובייקט בודד מה-API
const rawData = readOnly ? operatorCalls : allCalls;
const list = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);
  // בחירת הנתונים והמצבים הרלוונטיים בהתאם לסטטוס
  // const list = (readOnly ? operatorCalls : allCalls) || [];
  const isLoading = readOnly ? isLoadingOp : isLoadingAll;
  const isError = readOnly ? isErrorOp : isErrorAll;
  const error = readOnly ? errorOp : errorAll;
  
  // 2. פונקציית מחיקה (מוודא שהגדרת deleteCompany ב-companyApi)
  const [deleteCall] = useDeleteScoreMutation();
  const [IsToShowOnly, setIsToShowOnly] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
   const showScore=(call)=>{
    setSelectedCall(call);
    setIsDialogOpen(true);
    setIsToShowOnly(ture);
   }
  const handleEditClick = (call) => {
    setSelectedCall(call);
    setIsDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setSelectedCall(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("האם הינך בטוח שברצונך למחוק חברה זו?")) {
      try {
        await deleteCall(id).unwrap();
        // בזכות ה-Tags ב-API, הרשימה תתעדכן לבד!
      } catch (err) {
        console.error("Failed to delete call:", err);
      }
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // הצגת מצבי טעינה ושגיאה
  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
      <CircularProgress />
    </Box>
  );
  
  if (isError) return (
    <Alert severity="error" sx={{ mt: 2 }}>
      שגיאה בטעינת חברות: {error?.data?.title || error?.error || "שגיאה לא ידועה"}
    </Alert>
  );
console.log("סוג הרשימה:", typeof list, "האם מערך?", Array.isArray(list), "תוכן:", list);
  return (
    <div style={{ padding: '20px' }} dir="rtl">
      <Button variant="contained" onClick={handleAddNewClick} sx={{ mb: 2 }}>
        הוספת שיחה חדשה
      </Button>
      
      <h2>רשימת ציונים</h2>
      
      <table border="1" style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>ID שיחה</th>
            <th>ID ציון</th>
            <th>ציון אינטואיציה </th>
            <th>ציון פתירת קונליקט </th>
            <th>ציון מקצועיות  </th>
            <th> ציון סופי </th>
            <th>טפים לייעול</th>
            {!readOnly && <th>פעולות</th>}
          </tr>
        </thead>
        <tbody>
          {list?.map((call, index) => {
            console.log(call)
            const CallId = call.callId;
            const ScoreId = call.scoreId;
            const OperatorToneScore=call.operatorToneScore;
            const ConflictResolutionScore =call.conflictResolutionScore;
            const ProfessionalismScore=call.professionalismScore;
            const OverallScore=call.overallScore
            const ImprovementTips=call.improvementTips;           


            return (
              <tr key={CallId || index}>
                <td>{ScoreId}</td>
                <td>{OperatorToneScore}</td>
                <td>{ConflictResolutionScore}</td>
                <td>{ProfessionalismScore}</td>
                <td>{OverallScore}</td>
                <td>{ImprovementTips}</td>               
                {!readOnly&&  
                <td >
                  <Button color="primary" onClick={() => handleEditClick(call)}>ערוך</Button>
                  <Button 
                    onClick={() => handleDelete(CallId)}
                    sx={{ color: 'white', bgcolor: '#ff4d4d', '&:hover': { bgcolor: '#cc0000' }, ml: 1 }}
                  >
                    מחק
                  </Button>
                </td>}
              </tr>
            );
          })}
        </tbody>
      </table>
      
     <AddScore 
        open={isDialogOpen} 
        handleClose={handleCloseDialog} 
        callToEdit={selectedCall}

      />
      {list.length === 0 && <p style={{ marginTop: '20px' }}>אין שיחות להצגה.</p>}
    </div>
  );


};export default MonthlyGraf;