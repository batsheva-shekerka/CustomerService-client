import React, { useState } from 'react';
import { 
  Button, CircularProgress, Alert, Box, Typography, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper 
} from '@mui/material';
import AddCompany from './AddCompany';
import CompanyRow from './CompanyRow';
import { useGetAllCompaniesQuery, useDeleteCompanyMutation } from '../redux/api';

const CompaniesList = () => {
  const { data: list = [], isLoading, isError, error } = useGetAllCompaniesQuery();
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
      } catch (err) {
        console.error("Failed to delete company:", err);
      }
    }
  };

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
    <Box sx={{ padding: '30px' }} dir="rtl">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          ניהול חברות
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleAddNewClick}
          sx={{ borderRadius: '8px', px: 3, bgcolor: '#1a237e', '&:hover': { bgcolor: '#0d1440' } }}
        >
          הוספת חברה חדשה
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f7fb' }}>
            <TableRow>
              <TableCell sx={{ width: '50px' }} />
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>שם החברה</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>משפט מפתח</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((company) => (
              <CompanyRow 
                key={company.companyId || company.CompanyId} 
                company={company}
                onEdit={handleEditClick}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
        {list.length === 0 && (
          <Typography sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
            אין חברות להצגה כרגע.
          </Typography>
        )}
      </TableContainer>

      <AddCompany 
        open={isDialogOpen} 
        handleClose={() => setIsDialogOpen(false)} 
        companyToEdit={selectedCompany}
      />
    </Box>
  );
};

export default CompaniesList;