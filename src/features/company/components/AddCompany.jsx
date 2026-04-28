import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, CircularProgress } from '@mui/material';
// ייבוא ה-Hooks מה-API החדש
import { useAddCompanyMutation, useUpdateCompanyMutation } from '../redux/api';

const AddCompany = ({ open, handleClose, companyToEdit }) => {
  // הגדרת המוטציות
  const [addCompany, { isLoading: isAdding }] = useAddCompanyMutation();
  const [updateCompany, { isLoading: isUpdating }] = useUpdateCompanyMutation();

  const initialFormState = {
    CompanyName: '', 
    IntroPhrase: '', 
    AudioFolderRoute:'', 
  };

  const [formData, setFormData] = useState(initialFormState);

  // מצב עבור שגיאות ולידציה
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (companyToEdit) {
      setFormData({
        CompanyName: companyToEdit.companyName || '',
        IntroPhrase: companyToEdit.introPhrase || '',
        AudioFolderRoute:companyToEdit.AudioFolderRoute ||'',
      });
    } else {
      setFormData(initialFormState);
    }

    setErrors({}); // איפוס שגיאות בפתיחת הדיאלוג
  }, [companyToEdit, open]);

  // פונקציית ולידציה
  const validate = () => {
    let tempErrors = {};
    
    // בדיקת שם חברה (חובה)
    if (!formData.CompanyName) tempErrors.CompanyName = "שם חברה הוא שדה חובה";
    
    // בדיקת ניתוב תיקייה
    if (!formData.AudioFolderRoute) {
      tempErrors.AudioFolderRoute = "ניתוב תיקייה הוא שדה חובה";
    } else {
      // רגקס בסיסי שבודק פורמט נתיב (מתחיל ב-/ או ב-אות כונן :\ )
      const pathRegex = /^([a-zA-Z]:\\|\/|\/\/).*/;
      if (!pathRegex.test(formData.AudioFolderRoute)) {
        tempErrors.AudioFolderRoute = "הנתיב שהוזן אינו בפורמט תקין (לדוגמה: C:\\Folder או /home/user)";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // מחזיר true אם אין שגיאות
  };
  

  
 const handleSubmit = async (e) => {
  if (e) e.preventDefault(); // מונע שליחה כפולה של הדפדפן


  // עצירה אם הוולידציה נכשלה
    if (!validate()) return;

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
    // אם השרת החזיר שגיאה שהתיקייה לא קיימת באמת, אפשר לעדכן כאן:
      setErrors({ AudioFolderRoute: "השרת לא הצליח למצוא את התיקייה בנתיב המבוקש" });
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
              error={!!errors.AudioFolderRoute} // הופך את השדה לאדום אם יש שגיאה
              helperText={errors.AudioFolderRoute} // מציג את הודעת השגיאה מתחת לשדה
              value={formData.AudioFolderRoute} 
              variant="outlined" 
               onChange={(e) => {
                setFormData({...formData, AudioFolderRoute: e.target.value});
                if (errors.AudioFolderRoute) setErrors({...errors, AudioFolderRoute: ''}); // ניקוי שגיאה בזמן הקלדה
              }}         
             
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

export default AddCompany;