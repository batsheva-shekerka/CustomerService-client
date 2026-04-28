import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box, MenuItem, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
// ייבוא ה-Hooks החדשים מה-API
import { useAddOperatorMutation, useUpdateOperatorMutation } from '../redux/api'; 
// ייבוא הפעולה של החברות (אם עדיין לא העברת אותה ל-RTK Query)
import { useGetAllCompaniesQuery } from '../../company/redux/api';
import { useDispatch } from 'react-redux';

const AddOperator = ({ open, handleClose, operatorToEdit }) => {
  const dispatch = useDispatch();

  // הגדרת ה-Mutations
  const [addOperator, { isLoading: isAdding }] = useAddOperatorMutation();
  const [updateOperator, { isLoading: isUpdating }] = useUpdateOperatorMutation();

  const initialFormState = {
    FirstName: '', 
    LastName: '', 
    Mail: '', 
    Phone: '', 
    CompanyId: '', 
    PasswordHash: '123',
    Role: 0,
    HireDate: new Date().toISOString().split('T')[0]
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (operatorToEdit) {
      setFormData({
        operatorId: operatorToEdit.operatorId,
        FirstName: operatorToEdit.firstName || '',
        LastName: operatorToEdit.lastName || '',
        Mail: operatorToEdit.mail || '',
        Phone: operatorToEdit.phone || '',
        CompanyId: operatorToEdit.companyId || '',
        Role: operatorToEdit.role || 0,
        PasswordHash: operatorToEdit.passwordHash || '123',
        HireDate: operatorToEdit.hireDate ? operatorToEdit.hireDate.split('T')[0] : ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [operatorToEdit, open]);

  // לוגיקה של חברות (נשאר כרגע אותו דבר עד שתעבירי גם אותן ל-RTK Query)
 const { data: companies = [] } = useGetAllCompaniesQuery();

  const handleSubmit = async () => {
    try {
      if (operatorToEdit) {
        // ב-Update הגדרנו ב-API שהוא מקבל אובייקט עם id ו-data
        await updateOperator({ id: operatorToEdit.operatorId, data: formData }).unwrap();
      } else {
        // בהוספה שולחים את האובייקט ישירות
        await addOperator(formData).unwrap();
      }
      handleClose(); // סגירת המודאל רק אם הצליח
    } catch (err) {
      console.error('Failed to save operator:', err);
    }
  };

  const roles = [
    { value: 0, label: 'עובד' },
    { value: 1, label: 'מנהל' },
    { value: 2, label: 'מנהל ראשי' }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Dialog open={open} onClose={handleClose} dir="rtl">
        <DialogTitle>{operatorToEdit ? 'עריכת פרטי טלפנית' : 'הוספת טלפנית חדשה'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: '300px' }}>
            <TextField label="שם פרטי" fullWidth value={formData.FirstName} 
              onChange={(e) => setFormData({...formData, FirstName: e.target.value})} />
            <TextField label="שם משפחה" fullWidth value={formData.LastName} 
              onChange={(e) => setFormData({...formData, LastName: e.target.value})} />
            <TextField label="אימייל" type="email" fullWidth value={formData.Mail} 
              onChange={(e) => setFormData({...formData, Mail: e.target.value})} />
            <TextField label="טלפון" fullWidth value={formData.Phone} 
              onChange={(e) => setFormData({...formData, Phone: e.target.value})} />
            
            <TextField select label="בחר חברה" fullWidth value={formData.CompanyId} 
              onChange={(e) => setFormData({...formData, CompanyId: e.target.value})} >
              {companies.map((comp) => (
                <MenuItem key={comp.companyId} value={comp.companyId}>
                  {comp.companyName || "חברה ללא שם"}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="תאריך כניסה לעבודה" type='date' fullWidth value={formData.HireDate} 
              InputLabelProps={{ shrink: true }} 
              onChange={(e) => setFormData({...formData, HireDate: e.target.value})} />
            
            <TextField label="סיסמא" type="password" fullWidth value={formData.PasswordHash} 
              onChange={(e) => setFormData({...formData, PasswordHash: e.target.value})} />
            
            <TextField select label="תפקיד" value={formData.Role}
              onChange={(e) => setFormData({...formData, Role: e.target.value})} fullWidth >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isAdding || isUpdating}>ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" disabled={isAdding || isUpdating}>
            {isAdding || isUpdating ? <CircularProgress size={24} /> : (operatorToEdit ? 'עדכן שינויים' : 'שמור')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddOperator;