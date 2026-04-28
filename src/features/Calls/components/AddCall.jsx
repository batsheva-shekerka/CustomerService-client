import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, CircularProgress } from '@mui/material';
// ייבוא ה-Hooks מה-API החדש
import { useAddCallMutation, useUpdateCallMutation } from '../redux/api';

const AddCall = ({ open, handleClose, companyToEdit }) => {
  // הגדרת המוטציות
  const [addCompany, { isLoading: isAdding }] = useAddCallMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCallMutation();

  const initialFormState = {
    CompanyName: '', 
    IntroPhrase: '',
    AudioFolderRoute:'', 
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (companyToEdit) {
      setFormData({
        CompanyName: companyToEdit.companyName || '',
        IntroPhrase: companyToEdit.introPhrase || '',
        AudioFolderRoute:copmanyToEdit.AudioFolderRoute ||'',
      });
    } else {
      setFormData(initialFormState);
    }
  }, [companyToEdit, open]);

 const handleSubmit = async (e) => {
  if (e) e.preventDefault(); // מונע שליחה כפולה של הדפדפן

  try {
    const id = companyToEdit?.companyId || companyToEdit?.CompanyId;

    if (id) {
      console.log("Executing Update for ID:", id);
      await updateCompany({ 
        id: id, 
        // אנחנו מוסיפים את ה-ID גם לתוך הנתונים שנשלחים ב-Body
        data: { ...formData, CompanyId: id } 
      }).unwrap();
    } else {
      console.log("Executing Add New");
      await addCompany(formData).unwrap();
    }
    handleClose();
  } catch (err) {
    console.error('Failed to save company:', err);
  }
};
  return (
    <Box sx={{ mb: 3 }}>
      <Dialog open={open} onClose={handleClose} dir="rtl">
        <DialogTitle>{companyToEdit ? 'עריכת פרטי חברה' : 'הוספת חברה חדשה'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: '300px' }}>
            <TextField 
              label="שם חברה" 
              fullWidth 
              value={formData.CompanyName} 
              variant="outlined" 
              onChange={(e) => setFormData({...formData, CompanyName: e.target.value})} 
            />
            <TextField 
              label="משפט פתיחה" 
              fullWidth 
              value={formData.IntroPhrase} 
              variant="outlined" 
              onChange={(e) => setFormData({...formData, IntroPhrase: e.target.value})} 
            />
            <TextField
            label="ניתוב תקיית מידע"
            fullWidth
            value={formData.AudioFolderRoute}
            variant="outlined"
            onChange={(e)=>setFormData({...formData,AudioFolderRoute:e.target.value})}
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
            {isAdding || isUpdating ? <CircularProgress size={24} /> : (companyToEdit ? 'עדכן שינויים' : 'שמור')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCall;