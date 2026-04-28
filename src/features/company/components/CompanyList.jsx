import React, { useState } from 'react';
import { Button, CircularProgress, Alert, Box } from '@mui/material';
import AddCompany from './AddCompany';
// ייבוא ה-Hooks מה-API של החברות
import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from '../redux/api';

const CompaniesList = () => {
  // 1. שליפת נתונים אוטומטית
  const { data: list = [], isLoading, isError, error } = useGetAllCompaniesQuery();

  // 2. פונקציית מחיקה (מוודא שהגדרת deleteCompany ב-companyApi)
  const [deleteCompany] = useDeleteCompanyMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  const handleAddNewClick = () => {
    setSelectedCompany(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("האם הינך בטוח שברצונך למחוק חברה זו?")) {
      try {
        await deleteCompany(id).unwrap();
        // בזכות ה-Tags ב-API, הרשימה תתעדכן לבד!
      } catch (err) {
        console.error("Failed to delete company:", err);
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

  return (
    <div style={{ padding: '20px' }} dir="rtl">
      <Button variant="contained" onClick={handleAddNewClick} sx={{ mb: 2 }}>
        הוספת חברה חדשה
      </Button>
      
      <h2>רשימת חברות</h2>
      
      <table border="1" style={{ width: '100%', textAlign: 'right', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>שם</th>
            <th>משפט מפתח</th>
           <th>ניתוב תקיית מידע</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {list.map((company, index) => {
            const id = company.companyId || company.CompanyId;
            const companyName = company.companyName || company.CompanyName || "";
            const introPhrase = company.introPhrase || company.IntroPhrase || "";
            const audioFolderRoute = company.audioFolderRoute || company.AudioFolderRoute || "";

            return (
              <tr key={id || index}>
                <td>{companyName}</td>
                <td>{introPhrase}</td>
                 <td>{audioFolderRoute}</td>
                <td>
                  <Button color="primary" onClick={() => handleEditClick(company)}>ערוך</Button>
                  <Button 
                    onClick={() => handleDelete(id)}
                    sx={{ color: 'white', bgcolor: '#ff4d4d', '&:hover': { bgcolor: '#cc0000' }, ml: 1 }}
                  >
                    מחק
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <AddCompany 
        open={isDialogOpen} 
        handleClose={handleCloseDialog} 
        companyToEdit={selectedCompany}
      />

      {list.length === 0 && <p style={{ marginTop: '20px' }}>אין חברות להצגה.</p>}
    </div>
  );
};

export default CompaniesList;