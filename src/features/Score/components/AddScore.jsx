import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, CircularProgress } from '@mui/material';
// ייבוא ה-Hooks מה-API החדש
import { useAddScoreMutation, useUpdateScoreMutation } from '../redux/api';

const AddScore = ({ open, handleClose, scoreToEdit }) => {
  // הגדרת המוטציות
  const [addScore, { isLoading: isAdding }] = useAddScoreMutation();
  const [updateScore, { isLoading: isUpdating }] = useUpdateScoreMutation();

  const initialFormState = {
    ScoreId: '', 
    CallId: '',
    OperatorToneScore:'', 
    ConflictResolutionScore:'', 
    ProfessionalismScore:'', 
    OverallScore:'', 
    ImprovementTips:'', 

  };
//vbfs
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (scoreToEdit) {
      setFormData({
        ScoreId: scoreToEdit.ScoreId || '',
        CallId: scoreToEdit.CallId || '',
        OperatorToneScore:scoreToEdit.OperatorToneScore ||'',
        ConflictResolutionScore:scoreToEdit.ConflictResolutionScore ||'',
        ProfessionalismScore:scoreToEdit.ProfessionalismScore ||'',
        OverallScore:scoreToEdit.OverallScore ||'',
        ImprovementTips:scoreToEdit.ImprovementTips ||'',

      });
    } else {
      setFormData(initialFormState);
    }
  }, [scoreToEdit, open]);

 const handleSubmit = async (e) => {
  if (e) e.preventDefault(); // מונע שליחה כפולה של הדפדפן

  try {
    const id = scoreToEdit?.scoreId || scoreToEdit?.ScoreId;

    if (id) {
      console.log("Executing Update for ID:", id);
      await updateScore({ 
        id: id, 
        // אנחנו מוסיפים את ה-ID גם לתוך הנתונים שנשלחים ב-Body
        data: { ...formData, ScoreId: id } 
      }).unwrap();
    } else {
      console.log("Executing Add New");
      await addScore(formData).unwrap();
    }
    handleClose();
  } catch (err) {
    console.error('Failed to save Score:', err);
  }
};
  return (
    <Box sx={{ mb: 3 }}>
      <Dialog open={open} onClose={handleClose} dir="rtl">
        <DialogTitle>{scoreToEdit ? 'עריכת פרטי ציון' : 'הוספת ציון חדש'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: '300px' }}>
            <TextField 
              label="ציון לטון" 
              fullWidth 
              value={formData.OperatorToneScore} 
              variant="outlined" 
              onChange={(e) => setFormData({...formData, OperatorToneScore: e.target.value})} 
            />
            <TextField 
              label="פתירת קונפליקטים" 
              fullWidth 
              value={formData.ConflictResolutionScore} 
              variant="outlined" 
              onChange={(e) => setFormData({...formData, ConflictResolutionScore: e.target.value})} 
            />
            <TextField
            label="יעילות"
            fullWidth
            value={formData.ProfessionalismScore}
            variant="outlined"
            onChange={(e)=>setFormData({...formData,ProfessionalismScore:e.target.value})}
            />
              <TextField
            label="ציון כללי"
            fullWidth
            value={formData.OverallScore}
            variant="outlined"
            onChange={(e)=>setFormData({...formData,OverallScore:e.target.value})}
            />
            <TextField
            label="הערות לייעול"
            fullWidth
            value={formData.ImprovementTips}
            variant="outlined"
            onChange={(e)=>setFormData({...formData,ImprovementTips:e.target.value})}
            />
           
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isAdding || isUpdating}>ביטול</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary" 
            disabled={isAdding || isUpdating}
          >
            {isAdding || isUpdating ? <CircularProgress size={24} /> : (scoreToEdit ? 'עדכן שינויים' : 'שמור')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddScore;